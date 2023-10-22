import {CoreObject, CoreReflect, IClass, Nullable, Throwable} from "@semaver/core";
import {ClassTableProvider} from "../classtable/ClassTableProvider";
import {IClassTable} from "../classtable/IClassTable";
import {ObjectPrimitiveError} from "../errors/ObjectPrimitiveError";
import {ObjectUndefinedError} from "../errors/ObjectUndefinedError";
import {MetadataObject} from "../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {IMetadataTableRef} from "../metatable/metadata/IMetadataTableRef";
import {MetadataTableProvider} from "../metatable/MetadataTableProvider";
import {Accessor} from "./members/Accessor";
import {ClassMember} from "./members/ClassMember";
import {Constructor} from "./members/Constructor";
import {ConstructorParameter} from "./members/ConstructorParameter";
import {Field} from "./members/Field";
import {Method} from "./members/Method";
import {MethodParameter} from "./members/MethodParameter";
import {Property} from "./members/Property";
import {QueryExecutor} from "./query/QueryExecutor";


/**
 * @public
 * @class
 * @description - main class to retrieve info about class members and decorators from provided class or instance,
 * contains functionality to retrieve all decorated classes from class table,
 * contains functionality to perform dynamic decoration of class members or remove decorators from class members for provided class or instance,
 * contains functionality to perform filtering and selection of class members and class member decorators based on provided conditions,
 */
export class Reflector<T extends object = object> {

    /**
     * @private
     * @static
     * @readonly
     * @property classTableProvider - class table provide [[ClassTableProvider]] used to retrieve class table with all decorated classes
     */
    private static readonly classTableProvider: ClassTableProvider = new ClassTableProvider();

    /**
     * @public
     * @static
     * @method to get class table [[IClassTable]] with all classes that contains all decorator
     * @return class table
     */
    public static getClassTable(): IClassTable {
        return this.classTableProvider.getClassTable();
    }

    /**
     * @public
     * @static
     * @method to get class info from provided class or instance
     * @param obj - provided class or instance
     * @param autoSync - allow recalculation of metatable on each api call (default is false)
     * @return class info about provided class itself or class of provided instance
     */
    public static from<T extends object = object>(obj: IClass<T> | T, autoSync: boolean = false): Throwable<Reflector<T>> {
        if (CoreObject.isEmpty(obj)) {
            throw new ObjectUndefinedError(Reflector);
        } else if (CoreObject.isPrimitive(obj)) {
            throw new ObjectPrimitiveError(Reflector, obj);
        }
        return new Reflector(MetadataObject.classOf(obj), autoSync);
    }

    /**
     * @protected
     * @readonly
     * @property _class - class, that will be analysed to retrieve class info
     */
    protected readonly _class: IMetadataClass<T>;

    /**
     * @protected
     * @readonly
     * @property _autoSync - flag to allow recalculation of metatable on each api call (default is false)
     */
    protected readonly _autoSync: boolean;
    /**
     * @protected
     * @readonly
     * @property _constructors - collection of constructors [[Constructor]] of provided class
     */
    protected readonly _constructors: Constructor<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _methods - collection of methods [[Method]] of provided class
     */
    protected readonly _methods: Method<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _properties - collection of properties [[Property]] of provided class
     */
    protected readonly _properties: Property<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _accessors - collection of accessors [[Accessor]] of provided class
     */
    protected readonly _accessors: Accessor<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _fields - collection of fields [[Field]] of provided class
     */
    protected _fields: Field<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _members - collection of all class members [[ClassMember]] of provided class
     */
    protected _members: ClassMember<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _metadataTable - metatable provider [[MetadataTableProvider]] for decorated class
     */
    protected readonly _metadataTableProvider: MetadataTableProvider<T>;
    /**
     * @protected
     * @property _syncHash - hash to synchronize class info with metatable of class
     */
    protected _syncHash: Nullable<string> = undefined;

    /**
     * @protected
     * @constructor
     * @param targetClass - class, that will be analysed to retrieve class info
     * @param autoSync - allow recalculation of metatable on each api call (default is false)
     */
    protected constructor(targetClass: IMetadataClass<T>, autoSync: boolean = false) {
        this._class = targetClass;
        this._autoSync = autoSync;
        this._metadataTableProvider = new MetadataTableProvider(this._class);
        this.refresh();
    }

    /**
     * @public
     * @method to get actual hash of target class, recalculation of cache performed before return of the value (for example to cache any data outside of class info)
     * @return string representing hash of target class
     */
    public getHash(): string {
        this.refresh();
        return this._syncHash ?? "";
    }

    /**
     * @public
     * @method to retrieve constructor class member from provided target class
     * @return constructor class member of provided target class or undefined
     * @description constructor class member or it parameters should contain at least one decorator (or else return undefined)
     */
    public getDecoratedConstructor(): Nullable<Constructor<T>> {
        this.updateOnAutoSync();
        return this._constructors.length ? this._constructors[0] : undefined;
    }

    /**
     * @public
     * @method to retrieve constructor of class with known parameters
     * @return constructor of class with known parameters
     */
    public getConstructor(): Constructor<T> {
        this.updateOnAutoSync();
        return this.getDecoratedConstructor() || this.getNonDecoratedConstructor();
    }

    /**
     * @public
     * @method to retrieve method class member from provided target class
     * @param name - name of method (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static method with provided name
     * @return method class members of provided target class (decorated or not decorated if exists, or else return undefined)
     */
    public getMethod<TReturnType = unknown>(name: string, isStatic: boolean = false): Nullable<Method<T, TReturnType>> {
        this.updateOnAutoSync();
        return (this._methods.find((member) => member.isStatic() === isStatic && member.getName() === name)
            || this.getNonDecoratedMethod(name, isStatic)) as Nullable<Method<T, TReturnType>>;

    }

    /**
     * @public
     * @method to retrieve field class member (accessor or property) from provided target class
     * @param name - name of field (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static field with provided name
     * @return field class members of provided target class (decorated or not decorated if exists,
     * or else return autogenerated property [[Property]] with requested name and staticness)
     */
    public getField<TValue = unknown>(name: string, isStatic: boolean = false): Field<T, TValue> {
        this.updateOnAutoSync();
        return (this._fields.find((member) => member.isStatic() === isStatic && member.getName() === name)
            || this.getNonDecoratedAccessor(name, isStatic)
            || this.getNonDecoratedProperty(name, isStatic)) as Field<T, TValue>;

    }

    /**
     * @public
     * @method to retrieve accessor class member from provided target class
     * @param name - name of accessor (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static accessor with provided name
     * @return accessor class members of provided target class (decorated or not decorated if exists, or else return undefined)
     */
    public getAccessor<TValue = unknown>(name: string, isStatic: boolean = false): Nullable<Accessor<T, TValue>> {
        this.updateOnAutoSync();
        return (this._accessors.find((member) => member.isStatic() === isStatic && member.getName() === name)
            || this.getNonDecoratedAccessor(name, isStatic)) as Nullable<Accessor<T, TValue>>;
    }

    /**
     * @public
     * @method to retrieve property class member from provided target class
     * @param name - name of property (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static property with provided name
     * @return property class members of provided target class (decorated or not decorated if exists,
     * or else return autogenerated property [[Property]] with requested name and staticness))
     */
    public getProperty<TValue = unknown>(name: string, isStatic: boolean = false): Property<T, TValue> {
        this.updateOnAutoSync();
        return (this._properties.find((member) => member.isStatic() === isStatic && member.getName() === name)
            || this.getNonDecoratedProperty(name, isStatic)) as Property<T, TValue>;
    }

    /**
     * @public
     * @method to retrieve methods class members from provided target class
     * @return collection of methods class members of provided target class
     * @description method class member or it parameters should contain at least one decorator to appear in collection
     */
    public getDecoratedMethods(): ReadonlyArray<Method<T>> {
        this.updateOnAutoSync();
        return this._methods;
    }

    /**
     * @public
     * @method to retrieve fields class members (accessors and properties) from provided target class
     * @return collection of fields class members of provided target class
     * @description field class member should contain at least one decorator to appear in collection
     */
    public getDecoratedFields(): ReadonlyArray<Field<T>> {
        this.updateOnAutoSync();
        return this._fields;
    }

    /**
     * @public
     * @method to retrieve accessors class members from provided target class
     * @return collection of accessors class members of provided target class
     * @description accessor class member should contain at least one decorator to appear in collection
     */
    public getDecoratedAccessors(): ReadonlyArray<Accessor<T>> {
        this.updateOnAutoSync();
        return this._accessors;
    }

    /**
     * @public
     * @method to retrieve properties class members from provided target class
     * @return collection of properties class members of provided target class
     * @description property class member should contain at least one decorator to appear in collection
     */
    public getDecoratedProperties(): ReadonlyArray<Property<T>> {
        this.updateOnAutoSync();
        return this._properties;
    }

    /**
     * @public
     * @method to retrieve properties class members from provided target class
     * @return collection of properties class members of provided target class
     * @description property class member should contain at least one decorator to appear in collection
     */
    public getDecoratedMembers(): ReadonlyArray<ClassMember<T>> {
        this.updateOnAutoSync();
        return this._members;
    }

    /**
     * @public
     * @method to get query executor [[QueryExecutor]] for the class members of provided class
     * @return instance of query executor
     * @description query executor is used to filter and select class members and decorators based on provided options
     */
    public query(): QueryExecutor<T> {
        this.updateOnAutoSync();
        return new QueryExecutor(this._members);
    }

    /**
     * @public
     * @method to get all class information about all decorated members
     * @return current instance of reflector
     */
    public refresh(): this {
        if (this._syncHash !== this._class.__own_hash__ || this._metadataTableProvider.isMetatableChanged()) {
            this._constructors.length = 0;
            this._methods.length = 0;
            this._accessors.length = 0;
            this._properties.length = 0;

            const metadataTable: IMetadataTableRef = this._metadataTableProvider.getMetadataTable();
            this._syncHash = this._class.__own_hash__;

            // constructors
            metadataTable._constructors._static.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, this._class.length);
                const parameters: ConstructorParameter<T>[] = Array.from(Array(parameterLength)).reduce((collection, _, index) => {
                    collection.push(new ConstructorParameter(
                        this._class,
                        name,
                        true,
                        index,
                    ));
                    return collection;
                }, new Array<ConstructorParameter<T>>());

                this._constructors.push(new Constructor(
                    this._class,
                    name,
                    parameters,
                ));
            });

            metadataTable._constructors._instance.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, MetadataObject.getKnownConstructorParameterLength(this._class));
                const parameters: ConstructorParameter<T>[] = Array.from(Array(parameterLength)).reduce((collection, _, index) => {
                    collection.push(new ConstructorParameter(
                        this._class,
                        name,
                        false,
                        index,
                    ));
                    return collection;
                }, new Array<ConstructorParameter<T>>());

                this._constructors.push(new Constructor(
                    this._class,
                    name,
                    parameters,
                ));
            });

            // properties
            metadataTable._properties._static.forEach((structure, name) => {
                this._properties.push(new Property(
                    this._class,
                    name,
                    true,
                ));
            });

            metadataTable._properties._instance.forEach((structure, name) => {
                this._properties.push(new Property(
                    this._class,
                    name,
                    false,
                ));
            });

            // accessors
            metadataTable._accessors._static.forEach((structure, name) => {
                this._accessors.push(new Accessor(
                    this._class,
                    name,
                    true,
                ));
            });

            metadataTable._accessors._instance.forEach((structure, name) => {
                this._accessors.push(new Accessor(
                    this._class,
                    name,
                    false,
                ));
            });

            // methods
            metadataTable._methods._static.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, CoreReflect.getDescriptor(this._class, name)?.value?.length || 0);
                const parameters: MethodParameter<T>[] = Array.from(Array(parameterLength)).reduce((collection, _, index) => {
                    collection.push(new MethodParameter(
                        this._class,
                        name,
                        true,
                        index,
                    ));
                    return collection;
                }, new Array<MethodParameter<T>>());

                this._methods.push(new Method(
                    this._class,
                    name,
                    true,
                    parameters,
                ));
            });

            metadataTable._methods._instance.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, CoreReflect.getDescriptor(this._class.prototype, name)?.value?.length || 0);
                const parameters: MethodParameter<T>[] = Array.from(Array(parameterLength)).reduce((collection, _, index) => {
                    collection.push(new MethodParameter(
                        this._class,
                        name,
                        false,
                        index,
                    ));
                    return collection;
                }, new Array<MethodParameter<T>>());

                this._methods.push(new Method(
                    this._class,
                    name,
                    false,
                    parameters,
                ));
            });

            this._members = [...this._constructors, ...this._methods, ...this._properties, ...this._accessors];
            this._fields = [...this._properties, ...this._accessors];
        }
        return this;
    }

    /**
     * @protected
     * @method to update metatable if autoSync is enabled
     * @return void
     */
    protected updateOnAutoSync(): void {
        if (this._autoSync) {
            this.refresh();
        }
    }

    /**
     * @private
     * @method to get none decorated method based on provided parameters
     * @param name - name of method
     * @param isStatic - whether the method is static or not
     * @return method [[Method]] or if not found undefined
     */
    private getNonDecoratedMethod(name: string, isStatic: boolean): Nullable<Method<T>> {
        const target: T = isStatic ? this._class : this._class.prototype;
        const propertyDescriptor: Nullable<PropertyDescriptor> = CoreReflect.getDescriptor(target, name);
        if (propertyDescriptor) {
            const parameterLength: number = propertyDescriptor.value?.length || 0;
            return new Method<T>(
                this._class,
                name,
                isStatic,
                Array.from(Array(parameterLength))
                    .map((value, index) =>
                        new MethodParameter<T>(
                            this._class,
                            name,
                            isStatic,
                            index,
                        )),
            );
        }

        return undefined;
    }


    /**
     * @private
     * @method to get none decorated property based on provided parameters
     * @param name - name of property
     * @param isStatic - whether the property is static or not
     * @return property [[Property]], provided always, but can have undefined value due JS
     */
    private getNonDecoratedProperty(name: string, isStatic: boolean): Property<T> {
        return new Property(
            this._class,
            name,
            isStatic,
        );
    }


    /**
     * @private
     * @method to get none decorated accessor based on provided parameters
     * @param name - name of accessor
     * @param isStatic - whether the accessor is static or not
     * @return accessor [[Accessor]]
     */
    private getNonDecoratedAccessor(name: string, isStatic: boolean): Nullable<Accessor<T>> {
        const target: T = isStatic ? this._class : this._class.prototype;
        if (CoreReflect.has(target, name)) {
            return new Accessor<T>(
                this._class,
                name,
                isStatic,
            );
        }
        return undefined;
    }

    /**
     * @private
     * @method to get none decorated constructor
     * @return constructor [[Constructor]], exist always
     */
    private getNonDecoratedConstructor(): Constructor<T> {
        const parameterLength: number = MetadataObject.getKnownConstructorParameterLength(this._class);
        return new Constructor(
            this._class,
            Constructor.defaultName,
            Array.from(Array(parameterLength))
                .map((value, index) =>
                    new ConstructorParameter<T>(
                        this._class,
                        Constructor.defaultName,
                        false,
                        index,
                    )),
        );
    }
}

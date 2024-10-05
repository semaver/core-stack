import {
    Empty,
    getPropertyDescriptor,
    hasProperty,
    IClass,
    isObjectEmpty,
    isObjectPrimitive,
    JsFunction,
    Throwable
} from "@semaver/core";
import {ClassTableProvider} from "../classtable/ClassTableProvider";
import {IClassTable} from "../classtable/IClassTable";
import {ObjectPrimitiveError} from "../errors/ObjectPrimitiveError";
import {ObjectUndefinedError} from "../errors/ObjectUndefinedError";
import {getKnownConstructorParameterLength, metadataClassOfObject} from "../extentions/MetadataObjectExtention";
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
import {constructorName} from "../metatable/constants/ConstructorName";


/**
 *  main class to retrieve info about class members and decorators from provided class or instance,
 * contains functionality to retrieve all decorated classes from class table,
 * contains functionality to perform dynamic decoration of class members or remove decorators from class members for provided class or instance,
 * contains functionality to perform filtering and selection of class members and class member decorators based on provided conditions,
 *
 * @public
 */
export class Reflector<T extends object = object> {

    /**
     * @private
     * @readonly
     * @property classTableProvider - class table provider used to retrieve class table with all decorated classes
     */
    private static readonly classTableProvider: ClassTableProvider = new ClassTableProvider();
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
     * @property _constructors - collection of constructors for provided class
     */
    protected readonly _constructors: Constructor<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _methods - collection of methods for provided class
     */
    protected readonly _methods: Method<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _properties - collection of properties for provided class
     */
    protected readonly _properties: Property<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _accessors - collection of accessors for provided class
     */
    protected readonly _accessors: Accessor<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _fields - collection of fields for provided class
     */
    protected _fields: Field<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _members - collection of all class members for provided class
     */
    protected _members: ClassMember<T>[] = [];
    /**
     * @protected
     * @readonly
     * @property _metadataTable - metatable provider for decorated class
     */
    protected readonly _metadataTableProvider: MetadataTableProvider<T>;
    /**
     * @protected
     * @property _syncHash - hash to synchronize class info with metatable of class
     */
    protected _syncHash: Empty<string> = undefined;

    /**
     * @protected
     * @param targetClass - class, that will be analyzed to retrieve class info
     * @param autoSync - allow recalculation of metatable on each api call (default is false)
     */
    protected constructor(targetClass: IMetadataClass<T>, autoSync: boolean = false) {
        this._class = targetClass;
        this._autoSync = autoSync;
        this._metadataTableProvider = new MetadataTableProvider(this._class);
        this.refresh();
    }

    /**
     * method to get class table with all classes that contains all decorator
     *
     * @public
     * @returns class table
     */
    public static getClassTable(): IClassTable {
        return this.classTableProvider.getClassTable();
    }

    /**
     * method to get class info from provided class or instance
     *
     * @public
     * @param obj - provided class or instance
     * @param autoSync - allow recalculation of metatable on each api call (default is false)
     * @returns class info about provided class itself or class of provided instance
     */
    public static from<T extends object = object>(obj: IClass<T> | T, autoSync: boolean = false): Throwable<Reflector<T>> {
        if (isObjectEmpty(obj)) {
            throw new ObjectUndefinedError(Reflector);
        } else if (isObjectPrimitive(obj)) {
            throw new ObjectPrimitiveError(Reflector, obj);
        }
        return new Reflector(metadataClassOfObject(obj), autoSync);
    }

    /**
     * method to get actual hash of target class, recalculation of cache performed before return of the value (for example,
     * to cache any data outside class info)
     *
     * @public
     * @returns string representing hash of target class
     */
    public getHash(): string {
        this.refresh();
        return this._syncHash ?? "";
    }

    /**
     * method to retrieve constructor class member from provided target class
     * constructor class member or its parameters should contain at least one decorator (or else return undefined)
     *
     * @public
     * @returns constructor class member of provided target class or undefined
     */
    public getDecoratedConstructor(): Empty<Constructor<T>> {
        this.updateOnAutoSync();
        return this._constructors.length ? this._constructors[0] : undefined;
    }

    /**
     * method to retrieve constructor of class with known parameters
     *
     * @public
     * @returns constructor of class with known parameters
     */
    public getConstructor(): Constructor<T> {
        this.updateOnAutoSync();
        return this.getDecoratedConstructor() ?? this.getNonDecoratedConstructor();
    }

    /**
     * method to retrieve method class member from provided target class
     *
     * @public
     * @param name - name of method (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static method with provided name
     * @returns method class members of provided target class (decorated or not decorated if exists, or else return undefined)
     */
    public getMethod<TReturnType = unknown>(name: string, isStatic: boolean = false): Empty<Method<T, TReturnType>> {
        this.updateOnAutoSync();
        return (this._methods.find((member) => member.isStatic() === isStatic && member.getName() === name)
            ?? this.getNonDecoratedMethod(name, isStatic)) as Empty<Method<T, TReturnType>>;

    }

    /**
     * method to retrieve field class member (accessor or property) from provided target class
     *
     * @public
     * @param name - name of field (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static field with provided name
     * @returns field class members of provided target class (decorated or not decorated if exists,
     * or else return autogenerated property with requested name and statics)
     */
    public getField<TValue = unknown>(name: string, isStatic: boolean = false): Field<T, TValue> {
        this.updateOnAutoSync();
        return ((this._fields.find((member) => member.isStatic() === isStatic && member.getName() === name)
                ?? this.getNonDecoratedAccessor(name, isStatic))
            ?? this.getNonDecoratedProperty(name, isStatic)) as Field<T, TValue>;

    }

    /**
     * method to retrieve accessor class member from provided target class
     *
     * @public
     * @param name - name of accessor (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static accessor with provided name
     * @returns accessor class members of provided target class (decorated or not decorated if exists, or else return undefined)
     */
    public getAccessor<TValue = unknown>(name: string, isStatic: boolean = false): Empty<Accessor<T, TValue>> {
        this.updateOnAutoSync();
        return (this._accessors.find((member) => member.isStatic() === isStatic && member.getName() === name)
            ?? this.getNonDecoratedAccessor(name, isStatic)) as Empty<Accessor<T, TValue>>;
    }

    /**
     * method to retrieve property class member from provided target class
     *
     * @public
     * @param name - name of property (beware of obfuscation/minification level)
     * @param isStatic - flag used to find instance or static property with provided name
     * @returns property class members of provided target class (decorated or not decorated if exists,
     * or else return autogenerated property with requested name and statics)
     */
    public getProperty<TValue = unknown>(name: string, isStatic: boolean = false): Property<T, TValue> {
        this.updateOnAutoSync();
        return (this._properties.find((member) => member.isStatic() === isStatic && member.getName() === name)
            ?? this.getNonDecoratedProperty(name, isStatic)) as Property<T, TValue>;
    }

    /**
     * method to retrieve methods class members from provided target class
     * method class member or its parameters should contain at least one decorator to appear in the collection
     *
     * @public
     * @returns collection of methods class members of provided target class
     */
    public getDecoratedMethods(): readonly Method<T>[] {
        this.updateOnAutoSync();
        return this._methods;
    }

    /**
     * method to retrieve fields class members (accessors and properties) from provided target class
     * field class member should contain at least one decorator to appear in the collection
     *
     * @public
     * @returns collection of fields class members of provided target class
     */
    public getDecoratedFields(): readonly Field<T>[] {
        this.updateOnAutoSync();
        return this._fields;
    }

    /**
     * method to retrieve accessors class members from provided target class
     * accessor class member should contain at least one decorator to appear in the collection
     *
     * @public
     * @returns collection of accessors class members of provided target class
     */
    public getDecoratedAccessors(): readonly Accessor<T>[] {
        this.updateOnAutoSync();
        return this._accessors;
    }

    /**
     * method to retrieve properties' class members from provided target class
     * property class member should contain at least one decorator to appear in the collection
     *
     * @public
     * @returns collection of properties class members of provided target class
     */
    public getDecoratedProperties(): readonly Property<T>[] {
        this.updateOnAutoSync();
        return this._properties;
    }

    /**
     * method to retrieve all decorated class members from provided target class
     * decorated class member should contain at least one decorator to appear in the collection
     *
     * @public
     * @returns collection of decorated class members of provided target class
     */
    public getDecoratedMembers(): readonly ClassMember<T>[] {
        this.updateOnAutoSync();
        return this._members;
    }

    /**
     * method to get query executor for the class members of provided class
     * query executor is used to filter and select class members and decorators based on provided options
     *
     * @public
     * @returns instance of query executor
     */
    public query(): QueryExecutor<T> {
        this.updateOnAutoSync();
        return new QueryExecutor(this._members);
    }

    /**
     * method to get/refresh all class information about all decorated members
     *
     * @public
     * @returns current instance of reflector
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
                const parameters: ConstructorParameter<T>[] = [];
                for (let i: number = 0; i < parameterLength; i++) {
                    parameters.push(new ConstructorParameter(
                        this._class,
                        name,
                        true,
                        i,
                    ));
                }
                this._constructors.push(new Constructor(
                    this._class,
                    name,
                    parameters,
                ));
            });

            metadataTable._constructors._instance.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, getKnownConstructorParameterLength(this._class));
                const parameters: ConstructorParameter<T>[] = [];
                for (let i: number = 0; i < parameterLength; i++) {
                    parameters.push(new ConstructorParameter(
                        this._class,
                        name,
                        false,
                        i,
                    ));
                }

                this._constructors.push(new Constructor(
                    this._class,
                    name,
                    parameters,
                ));
            });

            // properties
            metadataTable._properties._static.forEach((_structure, name) => {
                this._properties.push(new Property(
                    this._class,
                    name,
                    true,
                ));
            });

            metadataTable._properties._instance.forEach((_structure, name) => {
                this._properties.push(new Property(
                    this._class,
                    name,
                    false,
                ));
            });

            // accessors
            metadataTable._accessors._static.forEach((_structure, name) => {
                this._accessors.push(new Accessor(
                    this._class,
                    name,
                    true,
                ));
            });

            metadataTable._accessors._instance.forEach((_structure, name) => {
                this._accessors.push(new Accessor(
                    this._class,
                    name,
                    false,
                ));
            });

            // methods
            metadataTable._methods._static.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, (getPropertyDescriptor(this._class, name)?.value as Empty<JsFunction>)?.length ?? 0);
                const parameters: MethodParameter<T>[] = [];
                for (let i: number = 0; i < parameterLength; i++) {
                    parameters.push(new MethodParameter(
                        this._class,
                        name,
                        true,
                        i,
                    ));
                }

                this._methods.push(new Method(
                    this._class,
                    name,
                    true,
                    parameters,
                ));
            });

            metadataTable._methods._instance.forEach((structure, name) => {
                const parameterLength: number = Math.max(structure._parameters.length, (getPropertyDescriptor(this._class.prototype as Empty<object>, name)?.value as Empty<JsFunction>)?.length ?? 0);
                const parameters: MethodParameter<T>[] = [];
                for (let i: number = 0; i < parameterLength; i++) {
                    parameters.push(new MethodParameter(
                        this._class,
                        name,
                        false,
                        i,
                    ));
                }

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
     * method to update metatable if autoSync is enabled
     *
     * @protected
     * @returns void
     */
    protected updateOnAutoSync(): void {
        if (this._autoSync) {
            this.refresh();
        }
    }

    /**
     * method to get none decorated method based on provided parameters
     *
     * @private
     * @param name - name of method
     * @param isStatic - whether the method is static or not
     * @returns method or if not found undefined
     */
    private getNonDecoratedMethod(name: string, isStatic: boolean): Empty<Method<T>> {
        const target: object = isStatic ? this._class : this._class.prototype as object;
        const propertyDescriptor: Empty<PropertyDescriptor> = getPropertyDescriptor(target, name);
        if (propertyDescriptor) {
            const parameterLength: number = (propertyDescriptor.value as Empty<JsFunction>)?.length ?? 0;
            const parameters: MethodParameter<T>[] = [];
            for (let i: number = 0; i < parameterLength; i++) {
                parameters.push(new MethodParameter(
                    this._class,
                    name,
                    isStatic,
                    i,
                ));
            }

            return new Method<T>(
                this._class,
                name,
                isStatic,
                parameters,
            );
        }

        return undefined;
    }


    /**
     * method to get none decorated property based on provided parameters
     *
     * @private
     * @param name - name of property
     * @param isStatic - whether the property is static or not
     * @returns property, provided always, but can have undefined value due JS
     */
    private getNonDecoratedProperty(name: string, isStatic: boolean): Property<T> {
        return new Property(
            this._class,
            name,
            isStatic,
        );
    }


    /**
     * method to get none decorated accessor based on provided parameters
     *
     * @private
     * @param name - name of accessor
     * @param isStatic - whether the accessor is static or not
     * @returns accessor
     */
    private getNonDecoratedAccessor(name: string, isStatic: boolean): Empty<Accessor<T>> {
        const target: object = isStatic ? this._class : this._class.prototype as object;
        if (hasProperty(target, name)) {
            return new Accessor<T>(
                this._class,
                name,
                isStatic,
            );
        }
        return undefined;
    }

    /**
     * method to get none decorated constructor
     * @private
     * @returns constructor, exist always
     */
    private getNonDecoratedConstructor(): Constructor<T> {
        const parameterLength: number = getKnownConstructorParameterLength(this._class);
        const parameters: ConstructorParameter<T>[] = [];
        for (let i: number = 0; i < parameterLength; i++) {
            parameters.push(new ConstructorParameter(
                this._class,
                constructorName,
                false,
                i,
            ));
        }
        return new Constructor(
            this._class,
            constructorName,
            parameters,
        );
    }
}

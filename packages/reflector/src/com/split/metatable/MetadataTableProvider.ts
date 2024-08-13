import {classOfObject, haveObjectsSameClass, IClass, Nullable, superClassOfObject} from "@semaver/core";
import {v4 as uuid} from 'uuid';
import {ClassTable} from "../classtable/ClassTable";
import {ClassTableProvider} from "../classtable/ClassTableProvider";
import {ClassTableUpdateTypes} from "../classtable/ClassTableUpdateTypes";
import {IMetatableDecorator} from "../decorators/Decorator";
import {CollisionPolicyError} from "../errors/CollisionPolicyError";
import {getMetadataObjectSuperClassChain, metadataSuperClassOfObject} from "../extentions/MetadataObjectExtention";
import {IMetadataClass, MetadataClassNames} from "./classes/IMetadataClass";
import {IMemberMetadata} from "./metadata/IMemberMetadata";
import {IMemberMetadataTableRef, IMetadataTableRef, IStructureMetadataTableRef} from "./metadata/IMetadataTableRef";
import {
    MetadataAccessPolicyValues,
    PrimitiveMetadataAccessPolicy,
    PrimitiveMetadataAccessPolicyValues
} from "./policies/MetadataAccessPolicy";
import {MetadataAppearancePolicy} from "./policies/MetadataAppearancePolicy";
import {MetadataCollisionPolicy} from "./policies/MetadataCollisionPolicy";
import {MetadataNotExistencePolicy} from "./policies/MetadataNotExistencePolicy";
import {
    MetadataSameTargetMultiUsagePolicy,
    MetadataSameTargetMultiUsagePolicyValues
} from "./policies/MetadataSameTargetMultiUsagePolicy";
import {DecoratedElementEnum} from "./types/DecoratedElementEnum";

/**
 * function to create default metadata table (helper)
 *
 * @private
 * @returns - default empty metadata table
 */
function createMetadataTable(): IMetadataTableRef {
    return {
        _constructors: {
            _instance: new Map<string, IMemberMetadataTableRef>(),
            _static: new Map<string, IMemberMetadataTableRef>(),
        },
        _accessors: {
            _instance: new Map<string, IMemberMetadataTableRef>(),
            _static: new Map<string, IMemberMetadataTableRef>(),
        },
        _properties: {
            _instance: new Map<string, IMemberMetadataTableRef>(),
            _static: new Map<string, IMemberMetadataTableRef>(),
        },
        _methods: {
            _instance: new Map<string, IMemberMetadataTableRef>(),
            _static: new Map<string, IMemberMetadataTableRef>(),
        },

    };
}

/**
 * function to create default class member metadata table (helper)
 *
 * @private
 * @returns - default empty class member metadata table
 */
function createMemberMetadataTable(): IMemberMetadataTableRef {
    return {
        _decorators: new Array<IMetatableDecorator>(),
        _parameters: [],
    };
}

/**
 * function to get a map element by key (helper),
 * if not found and default value is provided, default value will be assigned and returned
 *
 * @private
 * @param map - provided map
 * @param key - provided key
 * @param defaultValue - default value
 * @returns requested value
 */
function getMapElementOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    defaultValue = map.get(key) ?? defaultValue;
    if (!map.has(key)) {
        map.set(key, defaultValue);
    }
    return defaultValue;
}

/**
 * provider that represents metadata table of some class and provide the information about metadata
 *
 * @public
 */
export class MetadataTableProvider<T extends object = object> {

    /**
     * @private
     * @readonly
     * @property _metadataTable - metadata table of the target class that contains information about metadata (pure) only of this class
     */
    private readonly _metadataTable: IMetadataTableRef;
    /**
     * @private
     * @readonly
     * @property _class - class that contains decorated class members
     */
    private readonly _class: IMetadataClass<T>;
    /**
     * @private
     * @readonly
     * @property classTable - class table provides access to all decorated classes
     */
    private readonly classTable: ClassTable = new ClassTableProvider().getClassTable();

    /**
     * @public
     * @param metadataClass - class that contains decorated class members
     */
    public constructor(metadataClass: IMetadataClass<T>) {
        this._class = metadataClass;
        this._metadataTable = MetadataTableProvider.getOrCreateClassMetadataTable(metadataClass);
    }

    /**
     * method to create or get existing own metadata table of provided class
     *
     * @private
     * @param target - class that contains metadata
     * @returns own metadata table of provided class
     */
    private static getOrCreateClassMetadataTable<T>(target: IMetadataClass<T>): IMetadataTableRef {
        if (Reflect.ownKeys(target).find((value) => value === MetadataClassNames.METADATA)) {
            return target.__metadata__;
        } else {
            const metadataTable: IMetadataTableRef = createMetadataTable();
            Reflect.defineProperty(target, MetadataClassNames.METADATA, {
                configurable: false,
                enumerable: true,
                value: metadataTable,
                writable: false,
            });

            Reflect.defineProperty(target, MetadataClassNames.CACHED_METADATA, {
                configurable: false,
                enumerable: true,
                value: undefined,
                writable: true,
            });

            Reflect.defineProperty(target, MetadataClassNames.OWN_HASH, {
                configurable: false,
                enumerable: true,
                value: uuid(),
                writable: true,
            });

            Reflect.defineProperty(target, MetadataClassNames.PARENT_HASH, {
                configurable: false,
                enumerable: true,
                value: undefined,
                writable: true,
            });

            return metadataTable;
        }
    }

    /**
     * method to write/save decorator
     *
     * @public
     * @param decorator - used to decorate class member or parameter of the current class
     */
    public add(decorator: IMetatableDecorator): void {
        let operationResult: boolean = false;
        const metadata: IMemberMetadata = decorator.__metadata__;

        switch (metadata.type) {
            case DecoratedElementEnum.CONSTRUCTOR:
                if (metadata.isStatic) {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.CONSTRUCTOR, decorator, this._metadataTable._constructors._static);
                } else {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.CONSTRUCTOR, decorator, this._metadataTable._constructors._instance);
                }
                break;
            case DecoratedElementEnum.METHOD:
                if (metadata.isStatic) {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.STATIC_METHOD, decorator, this._metadataTable._methods._static);
                } else {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.INST_METHOD, decorator, this._metadataTable._methods._instance);
                }
                break;
            case DecoratedElementEnum.PROPERTY:
                if (metadata.isStatic) {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.STATIC_PROPERTY, decorator, this._metadataTable._properties._static);
                } else {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.INST_PROPERTY, decorator, this._metadataTable._properties._instance);
                }
                break;
            case DecoratedElementEnum.ACCESSOR:
                if (metadata.isStatic) {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR, decorator, this._metadataTable._accessors._static);
                } else {
                    operationResult = this.addMemberDecorator(PrimitiveMetadataAccessPolicy.INST_ACCESSOR, decorator, this._metadataTable._accessors._instance);
                }
                break;
            case DecoratedElementEnum.CONSTRUCTOR_PARAMETER:
                if (metadata.isStatic) {
                    operationResult = this.addParameterMetadata(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR, decorator, this._metadataTable._constructors._static);
                } else {
                    operationResult = this.addParameterMetadata(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR, decorator, this._metadataTable._constructors._instance);
                }
                break;
            case DecoratedElementEnum.METHODS_PARAMETER:
                if (metadata.isStatic) {
                    operationResult = this.addParameterMetadata(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD, decorator, this._metadataTable._methods._static);
                } else {
                    operationResult = this.addParameterMetadata(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INST_METHOD, decorator, this._metadataTable._methods._instance);
                }
                break;
        }
        if (operationResult) {
            this._class.__own_hash__ = uuid();
            this._class.__cached_metadata__ = undefined;

            if (!this.classTable.getWriteableClasses().has(this._class)) {
                this.classTable.getWriteableClasses().add(this._class);
                this.classTable.setSyncHash(uuid());
            }
            this.classTable.notify({
                type: ClassTableUpdateTypes.METADATA_ADDED,
                decorator: decorator,
                targetClass: this._class,
                decoratedElement: {
                    type: decorator.__metadata__.type,
                    name: decorator.__metadata__.name,
                    isStatic: decorator.__metadata__.isStatic,
                    parameterIndex: decorator.__metadata__.parameterIndex,
                }
            });
        }

    }

    /**
     * method to delete/remove decorator
     *
     * @public
     * @param decorator - used to decorate class member or parameter of the current class
     */
    public remove(decorator: IMetatableDecorator): void {
        let operationResult: boolean = false;
        const metadata: IMemberMetadata = decorator.__metadata__;

        switch (metadata.type) {
            case DecoratedElementEnum.CONSTRUCTOR:
                if (metadata.isStatic) {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._constructors._static);
                } else {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._constructors._instance);
                }
                break;
            case DecoratedElementEnum.METHOD:
                if (metadata.isStatic) {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._methods._static);
                } else {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._methods._instance);
                }
                break;
            case DecoratedElementEnum.PROPERTY:
                if (metadata.isStatic) {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._properties._static);
                } else {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._properties._instance);
                }
                break;
            case DecoratedElementEnum.ACCESSOR:
                if (metadata.isStatic) {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._accessors._static);
                } else {
                    operationResult = this.deleteMemberMetadata(decorator, this._metadataTable._accessors._instance);
                }
                break;
            case DecoratedElementEnum.CONSTRUCTOR_PARAMETER:
                if (metadata.isStatic) {
                    operationResult = this.deleteParameterMetadata(decorator, this._metadataTable._constructors._static);
                } else {
                    operationResult = this.deleteParameterMetadata(decorator, this._metadataTable._constructors._instance);
                }
                break;
            case DecoratedElementEnum.METHODS_PARAMETER:
                if (metadata.isStatic) {
                    operationResult = this.deleteParameterMetadata(decorator, this._metadataTable._methods._static);
                } else {
                    operationResult = this.deleteParameterMetadata(decorator, this._metadataTable._methods._instance);
                }
                break;
        }

        if (operationResult) {
            this._class.__own_hash__ = uuid();
            this._class.__cached_metadata__ = undefined;

            if (!this.hasOwnDecorators()) {
                this.classTable.getWriteableClasses().delete(this._class);
                this.classTable.setSyncHash(uuid());
            }

            this.classTable.notify({
                type: ClassTableUpdateTypes.METADATA_REMOVED,
                decorator: decorator,
                targetClass: this._class,
                decoratedElement: {
                    type: decorator.__metadata__.type,
                    name: decorator.__metadata__.name,
                    isStatic: decorator.__metadata__.isStatic,
                    parameterIndex: decorator.__metadata__.parameterIndex,
                }
            });
        }
    }

    /**
     * method to check if class has own decorators
     *
     * @public
     * @returns true if class has its own decorators
     */
    public hasOwnDecorators(): boolean {
        return !!(this._class.__metadata__._constructors._static.size
            + this._class.__metadata__._constructors._instance.size
            + this._class.__metadata__._methods._static.size
            + this._class.__metadata__._methods._instance.size
            + this._class.__metadata__._properties._static.size
            + this._class.__metadata__._properties._instance.size
            + this._class.__metadata__._accessors._static.size
            + this._class.__metadata__._accessors._instance.size);
    }

    /**
     * method to get own class metadata table
     *
     * @public
     * @returns own metadata table
     *
     */
    public getOwnMetadataTable(): IMetadataTableRef {
        return this._metadataTable;
    }

    /**
     * method to get full proceeded class metadata table
     *
     * @public
     * @returns full proceeded class metadata table
     */
    public getMetadataTable(): IMetadataTableRef {
        return !this._class.__cached_metadata__ || this.isMetatableChanged() ? this.calculateMetadataTable(this._class) : this._class.__cached_metadata__;
    }

    /**
     * method to get only own class members decorators
     *
     * @public
     * @returns - collection of own class members decorators
     */
    public getOwnDecorators(): IMetatableDecorator[] {
        return this.collectMetadataTableDecorators(this._metadataTable);
    }

    /**
     * method to get all proceeded (own and inherited) class members decorators
     *
     * @public
     * @returns - collection of all proceeded class members decorators
     */
    public getDecorators(): IMetatableDecorator[] {
        return this.collectMetadataTableDecorators(this.getMetadataTable());
    }

    /**
     * method to check if metadata table had any changes
     *
     * @public
     * @returns true if metatable was modified (of current class or any superclass in chain)
     */
    public isMetatableChanged(): boolean {
        const chain: readonly IMetadataClass<object>[] = getMetadataObjectSuperClassChain(this._class);
        return !this._class.__cached_metadata__
            || chain.some((metadataClass: IMetadataClass<object>) => {
                return metadataClass.__parent_hash__ !== metadataClass.__own_hash__
                    && metadataClass.__parent_hash__ !== metadataSuperClassOfObject(metadataClass, true)?.__own_hash__;
            });
    }

    /**
     * method to check if decoration is allowed based on policy
     *
     * @private
     * @param access - primitive access policy
     * @param decorator - used to decorate class member or parameter of the current class
     * @returns true if decoration is allowed
     */
    private isDecorationAllowed(access: PrimitiveMetadataAccessPolicyValues, decorator: IMetatableDecorator): boolean {
        const accessPolicy: MetadataAccessPolicyValues = decorator.getAccessPolicy();
        const sameTargetMultiUsagePolicy: MetadataSameTargetMultiUsagePolicyValues = decorator.getSameTargetMultiUsagePolicy(access);

        return !!(accessPolicy & decorator.__metadata__.access) &&
            (sameTargetMultiUsagePolicy === MetadataSameTargetMultiUsagePolicy.ALLOWED
                || !this.getOwnDecorators().some((ownDecorator) =>
                    haveObjectsSameClass(decorator, ownDecorator)
                    && ownDecorator.__metadata__.type === decorator.__metadata__.type
                    && ownDecorator.__metadata__.name === decorator.__metadata__.name
                    && ownDecorator.__metadata__.isStatic === decorator.__metadata__.isStatic
                    && ownDecorator.__metadata__.parameterIndex === decorator.__metadata__.parameterIndex,
                ));
    }

    /**
     * method to get/proceed metadata information
     *
     * @private
     * @param metadataClass - proceeded metadata class
     * @returns full proceeded metatable of metadata class
     */
    private calculateMetadataTable<S extends object, C extends S>(metadataClass: IMetadataClass<C>): IMetadataTableRef {
        const superClass: Nullable<IMetadataClass<S>> = metadataSuperClassOfObject(metadataClass, true);
        let result: IMetadataTableRef;
        if (!superClass) {
            metadataClass.__parent_hash__ = metadataClass.__own_hash__;
            result = metadataClass.__cached_metadata__ = metadataClass.__metadata__;
        } else {
            MetadataTableProvider.getOrCreateClassMetadataTable(superClass);
            const cachedMetatable: IMetadataTableRef = this.calculateMetadataTable(superClass);

            if (superClass.__own_hash__ === metadataClass.__parent_hash__ && metadataClass.__cached_metadata__) {
                result = metadataClass.__cached_metadata__;
            } else {
                result = metadataClass.__cached_metadata__ = this.merge(metadataClass, metadataClass.__metadata__, cachedMetatable);
                metadataClass.__parent_hash__ = superClass.__own_hash__;
                metadataClass.__own_hash__ = uuid();
            }
        }

        return result;
    }

    /**
     * method to collect all decorators from member metadata table
     *
     * @private
     * @param memberTable - class member metadata table
     * @returns collection of decorators
     */
    private collectMemberDecorators(memberTable: IMemberMetadataTableRef): IMetatableDecorator[] {
        let result: IMetatableDecorator[] = [];
        result = result.concat(memberTable._decorators);

        memberTable._parameters.forEach((parameters) => {
            result = result.concat(parameters);
        });

        return result;
    }

    /**
     * method to collect all decorators from structure metadata table
     *
     * @private
     * @param structureTable - structure metadata table
     * @returns collection of decorators
     */
    private collectStructureDecorators(structureTable: IStructureMetadataTableRef): IMetatableDecorator[] {
        let result: IMetatableDecorator[] = [];

        structureTable._static.forEach((member) => {
            result = result.concat(this.collectMemberDecorators(member));
        });

        structureTable._instance.forEach((member) => {
            result = result.concat(this.collectMemberDecorators(member));
        });

        return result;
    }

    /**
     * method to collect all decorators from class metadata table
     *
     * @private
     * @param metadataTable - source metadata table
     * @returns collection of decorators
     */
    private collectMetadataTableDecorators(metadataTable: IMetadataTableRef): IMetatableDecorator[] {
        return this.collectStructureDecorators(metadataTable._constructors).concat(
            this.collectStructureDecorators(metadataTable._methods),
            this.collectStructureDecorators(metadataTable._accessors),
            this.collectStructureDecorators(metadataTable._properties),
        );
    }

    /**
     * method to merge child class metadata/decorators table with super class metadata/decorators table
     * all class member metadata are merged based on rules provided in decorators,
     * exclusion only for constructor parameters, if the child class constructor contains own (redefined) parameters,
     * then the decorators (metadata) of super class constructor parameters is not included, and if necessary in child class it should be redefined.
     * If the child class does not contain "own" constructor, them the decorators (metadata) of superclass constructor parameters is applied to child constructor parameters.
     *
     * @private
     * @param childClass - child class to get additional information
     * @param childClassMt - child class metadata table
     * @param superClassMt - superclass metadata table
     * @returns merged class metadata/decorators table
     */
    private merge<C extends object>(childClass: IMetadataClass<C>, childClassMt: IMetadataTableRef, superClassMt: IMetadataTableRef): IMetadataTableRef {
        const result: IMetadataTableRef = createMetadataTable();

        // constructor static
        this.mergeConstructors(
            PrimitiveMetadataAccessPolicy.CONSTRUCTOR,
            childClass,
            childClassMt._constructors._static,
            new Map<string, IMemberMetadataTableRef>(),
            result._constructors._static,
        );

        // constructor instance
        this.mergeConstructors(
            PrimitiveMetadataAccessPolicy.CONSTRUCTOR,
            childClass,
            childClassMt._constructors._instance,
            superClassMt._constructors._instance,
            result._constructors._instance,
        );

        // properties static
        this.mergeFields(
            PrimitiveMetadataAccessPolicy.STATIC_PROPERTY,
            childClass,
            childClassMt._properties._static,
            new Map<string, IMemberMetadataTableRef>(),
            result._properties._static,
        );

        // properties instance
        this.mergeFields(
            PrimitiveMetadataAccessPolicy.INST_PROPERTY,
            childClass,
            childClassMt._properties._instance,
            superClassMt._properties._instance,
            result._properties._instance,
        );

        // accessors static
        this.mergeFields(
            PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR,
            childClass,
            childClassMt._accessors._static,
            new Map<string, IMemberMetadataTableRef>(),
            result._accessors._static,
        );

        // accessors instance
        this.mergeFields(
            PrimitiveMetadataAccessPolicy.INST_ACCESSOR,
            childClass,
            childClassMt._accessors._instance,
            superClassMt._accessors._instance,
            result._accessors._instance,
        );


        // methods statics
        this.mergeMethods(
            PrimitiveMetadataAccessPolicy.STATIC_METHOD,
            childClass,
            childClassMt._methods._static,
            new Map<string, IMemberMetadataTableRef>(),
            result._methods._static,
        );

        // methods instance
        this.mergeMethods(
            PrimitiveMetadataAccessPolicy.INST_METHOD,
            childClass,
            childClassMt._methods._instance,
            superClassMt._methods._instance,
            result._methods._instance,
        );

        return result;
    }

    /**
     * method to merge child constructors metadata/decorators' table with superclass constructors metadata/decorators' table
     *
     * @private
     * @param access - primitive access policy
     * @param childClassMt - child class metadata table
     * @param superClassMt - superclass metadata table
     * @param childClass - child class to get additional information
     * @param resultMt - merged constructors metadata
     */
    private mergeConstructors<C extends object>(access: PrimitiveMetadataAccessPolicyValues, childClass: IMetadataClass<C>, childClassMt: Map<string, IMemberMetadataTableRef>, superClassMt: Map<string, IMemberMetadataTableRef>, resultMt: Map<string, IMemberMetadataTableRef>): void {
        childClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        superClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        resultMt.forEach((_table, name) => {
            const superConstructorData: IMemberMetadataTableRef = superClassMt.get(name) ?? createMemberMetadataTable();
            const childConstructorData: IMemberMetadataTableRef = childClassMt.get(name) ?? createMemberMetadataTable();
            const resultConstructorData: IMemberMetadataTableRef = resultMt.get(name) ?? createMemberMetadataTable();

            resultConstructorData._decorators = this.mergeClassMemberMetadata(access, childClass, superConstructorData._decorators, childConstructorData._decorators);
            resultConstructorData._parameters = this.mergeParameters(
                access,
                childClass,
                childClass.length ? [] : superConstructorData._parameters,
                childConstructorData._parameters,
            );

            if (resultMt.has(name) && !resultConstructorData._decorators.length && !resultConstructorData._parameters.some((parameter) => parameter.length > 0)) {
                resultMt.delete(name);
            }
        });
    }


    /**
     * method to merge child methods metadata/decorators' table with superclass methods metadata/decorators table
     *
     * @private
     * @param access - primitive access policy
     * @param childClassMt - child class metadata table
     * @param superClassMt - superclass metadata table
     * @param childClass - child class to get additional information
     * @param resultMt - merged methods metadata
     */
    private mergeMethods<C extends object>(access: PrimitiveMetadataAccessPolicyValues, childClass: IMetadataClass<C>, childClassMt: Map<string, IMemberMetadataTableRef>, superClassMt: Map<string, IMemberMetadataTableRef>, resultMt: Map<string, IMemberMetadataTableRef>): void {
        childClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        superClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        resultMt.forEach((_table, name) => {
            const superMethodData: IMemberMetadataTableRef = superClassMt.get(name) ?? createMemberMetadataTable();
            const childMethodData: IMemberMetadataTableRef = childClassMt.get(name) ?? createMemberMetadataTable();
            const resulMethodsData: IMemberMetadataTableRef = resultMt.get(name) ?? createMemberMetadataTable();

            resulMethodsData._decorators = this.mergeClassMemberMetadata(access, childClass, superMethodData._decorators, childMethodData._decorators);
            resulMethodsData._parameters = this.mergeParameters(access, childClass, superMethodData._parameters, childMethodData._parameters);

            if (resultMt.has(name) && !resulMethodsData._decorators.length && !resulMethodsData._parameters.some((parameter) => parameter.length > 0)) {
                resultMt.delete(name);
            }
        });
    }

    /**
     * method to merge child fields metadata/decorators' table with superclass fields metadata/decorators table
     *
     * @private
     * @param access - primitive access policy
     * @param childClassMt - child class metadata table
     * @param superClassMt - superclass metadata table
     * @param childClass - child class to get additional information
     * @param resultMt - merged fields metadata
     */
    private mergeFields<C extends object>(access: PrimitiveMetadataAccessPolicyValues, childClass: IMetadataClass<C>, childClassMt: Map<string, IMemberMetadataTableRef>, superClassMt: Map<string, IMemberMetadataTableRef>, resultMt: Map<string, IMemberMetadataTableRef>): void {
        childClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        superClassMt.forEach((_table, name) => {
            resultMt.set(name, createMemberMetadataTable());
        });

        resultMt.forEach((table, name) => {
            table._decorators = this.mergeClassMemberMetadata(
                access,
                childClass,
                superClassMt.get(name)?._decorators ?? [],
                childClassMt.get(name)?._decorators ?? [],
            );

            const metatable: Nullable<IMemberMetadataTableRef> = resultMt.get(name) ?? undefined;
            if (metatable && !metatable._decorators.length) {
                resultMt.delete(name);
            }
        });
    }

    /**
     * method to write constructor decorator into metadata table
     *
     * @private
     * @param access - primitive access policy
     * @param decorator - constructor decorator
     * @param membersMetadataTable
     * @returns true if decoration was successful
     */
    private addMemberDecorator(access: PrimitiveMetadataAccessPolicyValues, decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        if (this.isDecorationAllowed(access, decorator)) {
            getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable())._decorators.push(decorator);
            return true;
        }
        return false;
    }

    /**
     * method to write constructor parameter decorator into metadata table
     *
     * @private
     * @param access - primitive access policy
     * @param decorator - constructor parameter decorator
     * @param membersMetadataTable - members metadata tables by member name
     * @returns true if decoration was successful
     */
    private addParameterMetadata(access: PrimitiveMetadataAccessPolicyValues, decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        if (this.isDecorationAllowed(access, decorator)) {
            const parameters: IMetatableDecorator[][] = getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable())._parameters;
            parameters.length = Math.max(parameters.length, decorator.__metadata__.parameterIndex + 1);

            for (let i = 0; i < parameters.length; i++) {
                if (!parameters[i]) {
                    parameters[i] = [];
                }
                if (i === decorator.__metadata__.parameterIndex) {
                    parameters[i].push(decorator);
                }
            }
            return true;
        }
        return false;
    }

    /**
     * method to delete constructor decorator from metadata table
     *
     * @private
     * @param decorator - constructor decorator
     * @param membersMetadataTable - members metadata tables by member name
     * @returns true if removal of decorator was successful
     */
    private deleteMemberMetadata(decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        let isDeleted: boolean = false;
        const memberMetadataTable: IMemberMetadataTableRef = getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable());
        const index: number = memberMetadataTable._decorators.findIndex((memberDecorator) => decorator === memberDecorator);
        if (index !== -1) {
            memberMetadataTable._decorators.splice(index, 1);
            isDeleted = true;
        }

        if (!memberMetadataTable._parameters.length && !memberMetadataTable._decorators.length) {
            membersMetadataTable.delete(decorator.__metadata__.name);
        }

        return isDeleted;
    }

    /**
     * method to delete constructor decorator from metadata table
     *
     * @private
     * @param decorator - constructor decorator
     * @param membersMetadataTable - members metadata tables by member name
     * @returns true if removal of decorator was successful
     */
    private deleteParameterMetadata(decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        let isDeleted: boolean = false;
        const memberMetadataTable: IMemberMetadataTableRef = getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable());
        const parameters: IMetatableDecorator[][] = memberMetadataTable._parameters;
        parameters.length = Math.max(parameters.length, decorator.__metadata__.parameterIndex + 1);

        for (let i = 0; i < parameters.length; i++) {
            if (!parameters[i]) {
                parameters[i] = [];
            }
            if (i === decorator.__metadata__.parameterIndex) {
                const index: number = parameters[i].findIndex((memberDecorator) => decorator === memberDecorator);
                if (index !== -1) {
                    parameters[i].splice(index, 1);
                    isDeleted = true;
                }
            }
        }

        if (!memberMetadataTable._parameters.length && !memberMetadataTable._decorators.length) {
            membersMetadataTable.delete(decorator.__metadata__.name);
        }

        return isDeleted;
    }

    /**
     * method to merge generic child and superclass member decorators based on rules provided in decorators
     *
     * @private
     * @param access - primitive access policy
     * @param childClass - child class that contains decorator
     * @param superCachedDecorators - collection of superclass decorators
     * @param childDecorators - collection of child class decorators
     * @returns a merged collection of decorators
     */
    private mergeClassMemberMetadata<C extends object>(access: PrimitiveMetadataAccessPolicyValues, childClass: IMetadataClass<C>, superCachedDecorators: IMetatableDecorator[], childDecorators: IMetatableDecorator[]): IMetatableDecorator[] {
        const childClassName: string = childClass.name;

        const sharedInChild: IMetatableDecorator[] = [];
        const sharedInSuper: IMetatableDecorator[] = [];
        const inChild: IMetatableDecorator[] = [];
        const inSuper: IMetatableDecorator[] = [];

        const superDecoratorsByType: Map<IClass<unknown>, IMetatableDecorator[]> = new Map<IClass<unknown>, IMetatableDecorator[]>();
        const childDecoratorsByType: Map<IClass<unknown>, IMetatableDecorator[]> = new Map<IClass<C>, IMetatableDecorator[]>();

        superCachedDecorators
            .forEach((decorator) => {
                const decoratorClass: IClass<IMetatableDecorator> = classOfObject(decorator);
                const metadataDecorators: IMetatableDecorator[] = superDecoratorsByType.get(decoratorClass) ?? [];
                if (!superDecoratorsByType.has(decoratorClass)) {
                    superDecoratorsByType.set(decoratorClass, metadataDecorators);
                }
                metadataDecorators.push(decorator);
            });

        childDecorators
            .forEach((decorator) => {
                const decoratorClass: IClass<IMetatableDecorator> = classOfObject(decorator);
                const metadataDecorators: IMetatableDecorator[] = childDecoratorsByType.get(decoratorClass) ?? [];
                if (!childDecoratorsByType.has(decoratorClass)) {
                    childDecoratorsByType.set(decoratorClass, metadataDecorators);
                }
                metadataDecorators.push(decorator);
            });

        superDecoratorsByType.forEach((decorators, decoratorClass) => {
            if (childDecoratorsByType.has(decoratorClass)) {
                sharedInSuper.push(...decorators);
            } else {
                inSuper.push(...decorators);
            }
        });

        childDecoratorsByType.forEach((decorators, decoratorClass) => {
            if (superDecoratorsByType.has(decoratorClass)) {
                sharedInChild.push(...decorators);
            } else {
                inChild.push(...decorators);
            }
        });

        const memberDecorators: IMetatableDecorator[] = [];

        inChild.forEach((childDecorator) => {
            if (!(childDecorator.getAppearancePolicy(access) === MetadataAppearancePolicy.SKIP && this.hasSameSuperDecorator(childClass, childDecorator))) {
                memberDecorators.push(childDecorator);
            }
        });

        inSuper.forEach((superDecorator) => {
            if (superDecorator.getNotExistencePolicy(access) === MetadataNotExistencePolicy.APPLY) {
                memberDecorators.push(superDecorator);
            }
        });

        sharedInChild.forEach((childDecorator) => {
            if (childDecorator.getCollisionPolicy(access) === MetadataCollisionPolicy.SKIP) {
                sharedInSuper
                    .filter((superDecorator) => haveObjectsSameClass(superDecorator, childDecorator))
                    .forEach((superDecorator) => {
                        sharedInSuper.splice(sharedInSuper.indexOf(superDecorator), 1);
                    });
            } else if (childDecorator.getCollisionPolicy(access) === MetadataCollisionPolicy.OVERRIDE_CHILD) {
                sharedInSuper
                    .filter((superDecorator) => haveObjectsSameClass(superDecorator, childDecorator))
                    .forEach((superDecorator) => {
                        memberDecorators.push(superDecorator);
                        sharedInSuper.splice(sharedInSuper.indexOf(superDecorator), 1);
                    });
            } else if (childDecorator.getCollisionPolicy(access) === MetadataCollisionPolicy.OVERRIDE_PARENT) {
                sharedInSuper
                    .filter((superDecorator) => haveObjectsSameClass(superDecorator, childDecorator))
                    .forEach((superDecorator) => {
                        sharedInSuper.splice(sharedInSuper.indexOf(superDecorator), 1);
                    });
                memberDecorators.push(childDecorator);
            } else if (childDecorator.getCollisionPolicy(access) === MetadataCollisionPolicy.JOIN) {
                sharedInSuper
                    .filter((superDecorator) => haveObjectsSameClass(superDecorator, childDecorator))
                    .forEach((superDecorator) => {
                        memberDecorators.push(superDecorator);
                    });
                memberDecorators.push(childDecorator);
            } else if (childDecorator.getCollisionPolicy(access) === MetadataCollisionPolicy.THROW_ERROR) {
                throw new CollisionPolicyError(this, childClassName, childDecorator.constructor.name);
            }
        });

        return memberDecorators;
    }

    /**
     * method to merge generic child and superclass constructor or method parameter decorators based on rules provided in decorators
     *
     * @private
     * @param access - primitive access policy
     * @param childClass - child class that contains decorators
     * @param superCachedDecorators - collection by parameter index of superclass decorators
     * @param childDecorators - collection by parameter index of child class decorators
     * @returns a merged collection by parameter index of decorators
     */
    private mergeParameters<C extends object>(access: PrimitiveMetadataAccessPolicyValues, childClass: IMetadataClass<C>, superCachedDecorators: IMetatableDecorator[][], childDecorators: IMetatableDecorator[][]): IMetatableDecorator[][] {
        const parameterDecorators: IMetatableDecorator[][] = [];

        childDecorators.forEach((_decorator, index) => {
            parameterDecorators[index] = [];
        });

        superCachedDecorators.forEach((_decorator, index) => {
            parameterDecorators[index] = [];
        });

        parameterDecorators.forEach((_decorators, index) => {
            this.mergeClassMemberMetadata(access, childClass, superCachedDecorators[index] ?? [], childDecorators[index] ?? [])
                .forEach((metadata) => parameterDecorators[index].push(metadata));
        });

        return parameterDecorators;
    }

    /**
     * method to check if provided child member decorator exist in any metadata table of superclasses (constructor parameters and static member metadata are ignored)
     *
     * @private
     * @param childClass - child class to check
     * @param childDecorator - provided child member decorator
     * @returns true if provided child member decorator found
     */
    private hasSameSuperDecorator<C extends object>(childClass: IMetadataClass<C>, childDecorator: IMetatableDecorator): boolean {
        let metadataTableClass: Nullable<IMetadataClass<object>> = childClass;

        let isExist: boolean = false;

        if (!childDecorator.__metadata__.isStatic) {

            while (!isExist && metadataTableClass && superClassOfObject(metadataTableClass)) {
                const metadataTable: IMetadataTableRef = MetadataTableProvider.getOrCreateClassMetadataTable(metadataTableClass);
                switch (childDecorator.__metadata__.type) {
                    case DecoratedElementEnum.CONSTRUCTOR:
                        isExist = this.hasSameMetadataInMember(childDecorator, metadataTable._constructors._instance);
                        break;
                    case DecoratedElementEnum.PROPERTY:
                        isExist = this.hasSameMetadataInMember(childDecorator, metadataTable._properties._instance);
                        break;
                    case DecoratedElementEnum.ACCESSOR:
                        isExist = this.hasSameMetadataInMember(childDecorator, metadataTable._accessors._instance);
                        break;
                    case DecoratedElementEnum.METHOD:
                        isExist = this.hasSameMetadataInMember(childDecorator, metadataTable._methods._instance);
                        break;
                    case DecoratedElementEnum.METHODS_PARAMETER:
                        isExist = this.hasSameMetadataInParameter(childDecorator, metadataTable._methods._instance);
                        break;
                }

                metadataTableClass = metadataSuperClassOfObject(metadataTableClass);
            }
        }

        return isExist;
    }

    /**
     * method to check if provided decorator exist in metadata table
     *
     * @private
     * @param decorator - constructor decorator
     * @param membersMetadataTable - members metadata tables by member name
     * @returns true if provided constructor decorator found in metadata table
     */
    private hasSameMetadataInMember(decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        return getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable())
            ._decorators.some((memberDecorator) => haveObjectsSameClass(memberDecorator, decorator));
    }

    /**
     * method to check if provided instance method parameter decorator exist in metadata table
     *
     * @private
     * @param decorator - instance method parameter decorator
     * @param membersMetadataTable - members metadata tables by member name
     * @returns true if given instance method parameter decorator found in metadata table
     */
    private hasSameMetadataInParameter(decorator: IMetatableDecorator, membersMetadataTable: Map<string, IMemberMetadataTableRef>): boolean {
        return getMapElementOrDefault(membersMetadataTable, decorator.__metadata__.name, createMemberMetadataTable())
            ._parameters[decorator.__metadata__.parameterIndex].some((memberDecorator) => haveObjectsSameClass(memberDecorator, decorator));
    }
}

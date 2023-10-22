import {CoreObject, IClass, Nullable} from "@semaver/core";
import {IMetadataClass} from "../metatable/classes/IMetadataClass";

/**
 * @public
 * @class
 * @description - class add additional functionality to Object [[Object]]
 */
export class MetadataObject {
    /**
     * @public
     * @static
     * @method - to get the metadata class of given object
     * @param obj - object of generic type
     * @return class [[IClass]] of the given object
     */
    public static classOf<T extends object>(obj: IClass<T> | T): IMetadataClass<T> {
        return CoreObject.classOf(obj) as IMetadataClass<T>;
    }

    /**
     * @public
     * @static
     * @method - to get metadata super class of the given class
     * @param childClass - target class [[IClass]]
     * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
     * @return metadta super class [[IMetadataClass]] of the given class or undefined
     */
    public static superClassOf<S extends object, C extends S>(childClass: IClass<C>, ignoreNativeObjectClass: boolean = false): Nullable<IMetadataClass<S>> {
        return CoreObject.superClassOf(childClass, ignoreNativeObjectClass) as Nullable<IMetadataClass<S>>;
    }

    public static getKnownConstructorParameterLength(targetClass: IMetadataClass<object>): number {
        let target: Nullable<IMetadataClass<object>> = targetClass;
        while (target && !target.length) {
            target = this.superClassOf(target, true);
        }
        return target?.length || 0;
    }

    /**
     * @public
     * @static
     * @method - to get metadata super class chain of the object (collection, first element is source class of the object)
     * @param obj - object (class or instance) as source for super class chain
     * @param reversed - flag if true source class will appear at the end of array (default value - false)
     * @param excludeNativeObjectClass - flag to exclude native object [[Object]] class from chain (default value - true)
     * @return readonly array of metadata super classes
     */
    public static getSuperClassChain<S extends object>(obj: S, reversed: boolean = false, excludeNativeObjectClass: boolean = true): ReadonlyArray<IMetadataClass<object>> {
        return CoreObject.getSuperClassChain(obj, reversed, excludeNativeObjectClass) as ReadonlyArray<IMetadataClass<object>>;
    }
}


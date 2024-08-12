import {classOfObject, getObjectSuperClassChain, IClass, Nullable, superClassOfObject} from "@semaver/core";
import {IMetadataClass} from "../metatable/classes/IMetadataClass";

/**
 * function to get the metadata class of given object
 *
 * @public
 * @param obj - object of generic type
 * @returns class of the given object
 */
export function metadataClassOfObject<T extends object>(obj: IClass<T> | T): IMetadataClass<T> {
    return classOfObject(obj) as IMetadataClass<T>;
}

/**
 * function to get metadata super class of the given class
 *
 * @public
 * @param childClass - target class
 * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
 * @returns metadata super class of the given class or undefined
 */
export function metadataSuperClassOfObject<S extends object, C extends S>(childClass: Nullable<IClass<C>>, ignoreNativeObjectClass: boolean = false): Nullable<IMetadataClass<S>> {
    return superClassOfObject(childClass, ignoreNativeObjectClass) as Nullable<IMetadataClass<S>>;
}

/**
 * function to get known constructor parameter length of the target class
 *
 * @public
 * @param targetClass - target class
 * @returns number of known constructor parameters of the target class
 */
export function getKnownConstructorParameterLength(targetClass: IMetadataClass<object>): number {
    let target: Nullable<IMetadataClass<object>> = targetClass;
    while (target && !target.length) {
        target = metadataSuperClassOfObject(target, true);
    }
    return target?.length ?? 0;
}

/**
 * function to get metadata super class chain of the object (collection, first element is source class of the object)
 *
 * @public
 * @param obj - object (class or instance) as source for super class chain
 * @param reversed - flag if true source class will appear at the end of array (default value - false)
 * @param excludeNativeObjectClass - flag to exclude native object class from chain (default value - true)
 * @returns readonly array of metadata superclasses
 */
export function getMetadataObjectSuperClassChain(obj: Nullable<object>, reversed: boolean = false, excludeNativeObjectClass: boolean = true): readonly IMetadataClass<object>[] {
    return getObjectSuperClassChain(obj, reversed, excludeNativeObjectClass) as readonly IMetadataClass<object>[];
}


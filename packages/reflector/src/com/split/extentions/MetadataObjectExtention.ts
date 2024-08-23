import {classOfObject, getObjectSuperClassChain, IClass, Empty, superClassOfObject} from "@semaver/core";
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
 * function to get metadata superclass of the given class
 *
 * @public
 * @param childClass - target class
 * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
 * @returns metadata superclass of the given class or undefined
 */
export function metadataSuperClassOfObject<S extends object, C extends S>(childClass: Empty<IClass<C>>, ignoreNativeObjectClass: boolean = false): Empty<IMetadataClass<S>> {
    return superClassOfObject(childClass, ignoreNativeObjectClass) as Empty<IMetadataClass<S>>;
}

/**
 * function to get known constructor parameter length of the target class
 *
 * @public
 * @param targetClass - target class
 * @returns number of known constructor parameters of the target class
 */
export function getKnownConstructorParameterLength(targetClass: IMetadataClass<object>): number {
    let target: Empty<IMetadataClass<object>> = targetClass;
    while (target && !target.length) {
        target = metadataSuperClassOfObject(target, true);
    }
    return target?.length ?? 0;
}

/**
 * function to get a metadata superclass chain of the object (collection, the first element is source class of the object)
 *
 * @public
 * @param obj - object (class or instance) as a source for superclass chain
 * @param reversed - flag if true source class will appear at the end of array (default value - false)
 * @param excludeNativeObjectClass - flag to exclude native object class from the chain (default value - true)
 * @returns readonly array of metadata superclasses
 */
export function getMetadataObjectSuperClassChain(obj: Empty<object>, reversed: boolean = false, excludeNativeObjectClass: boolean = true): readonly IMetadataClass<object>[] {
    return getObjectSuperClassChain(obj, reversed, excludeNativeObjectClass) as readonly IMetadataClass<object>[];
}


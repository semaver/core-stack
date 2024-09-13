import {IClass} from "../types/base/IClass";
import {JsFunction} from "../types/js/JsFunction";
import {Empty} from "../types/utility/Empty";

/**
 * function to check if the given object null or undefined
 *
 * @public
 * @param obj - object of unknown type
 * @returns true if an object is null or undefined, if value 0 (number) return false
 */
export function isObjectEmpty(obj: unknown): boolean {
    return obj === null || obj === undefined;
}

/**
 * function to check if the given object is primitive
 *
 * @public
 * @param obj - object of type
 * @returns true if an object is primitive
 */
export function isObjectPrimitive(obj: unknown): boolean {
    return obj !== Object(obj);
}

/**
 * function to check if a given object is class or instance
 *
 * @public
 * @param obj - object to check
 * @returns true if a given object is class
 */
export function isObjectClass(obj: Empty<object & { call?: JsFunction, apply?: JsFunction }>): boolean {
    return !!(obj?.constructor && obj.call && obj.apply);
}

/**
 * function to get the class of given object
 *
 * @public
 * @param obj - object of generic type
 * @returns class of the given object
 */
export function classOfObject<T extends object>(obj: IClass<T> | T): IClass<T> {
    return (isObjectClass(obj) ? obj : obj.constructor) as IClass<T>;
}

/**
 * function to compare two given instances and checks if they instantiated from the same class
 *
 * @public
 * @param instanceA - instance A to compare
 * @param instanceB - instance B to compare
 * @returns true if both instances instantiated from the same class
 */
export function haveObjectsSameClass<A extends object, B extends object>(instanceA: Empty<A>, instanceB: Empty<B>): boolean {
    return !!(instanceA && instanceB && instanceA.constructor === instanceB.constructor);
}


/**
 * function to get superclass of the given class
 *
 * @public
 * @param childClass - target class to get super class
 * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
 * @returns super class of the given class or undefined
 */
export function superClassOfObject<S extends object, C extends S>(childClass: Empty<IClass<C>>, ignoreNativeObjectClass: boolean = false): Empty<IClass<S>> {
    const superPrototype: Empty<object> = childClass && Reflect.getPrototypeOf(childClass.prototype as object);
    const superClass: Empty<IClass<S>> = superPrototype?.constructor as IClass<S>;
    return (ignoreNativeObjectClass && isNativeObjectClass(superClass) ? undefined : superClass);
}

/**
 * function to check if a class is a native object class
 *
 * @public
 * @param targetClass - class to check
 * @returns true if is native object class (targetClass === Object)
 */
export function isNativeObjectClass<T extends object>(targetClass: Empty<IClass<T>>): boolean {
    return !!targetClass && !Reflect.getPrototypeOf(targetClass.prototype as object);
}

/**
 * function to get a superclass chain of the object (collection, the first element is source class of the object)
 *
 * @public
 * @param obj - object (class or instance) as a source for superclass chain
 * @param reversed - flag if true source class will appear at the end of array (default value - false)
 * @param excludeNativeObjectClass - flag to exclude native object class from a chain (default value - true)
 * @returns readonly array of superclasses
 */
export function getObjectSuperClassChain(obj: Empty<object>, reversed: boolean = false, excludeNativeObjectClass: boolean = true): readonly IClass<object>[] {
    const result: IClass<object>[] = [];
    if (!obj) return result;
    let targetClass: Empty<IClass<object>> = classOfObject(obj);

    do {
        if (excludeNativeObjectClass && isNativeObjectClass(targetClass)) {
            break;
        }
        if (reversed) {
            result.unshift(targetClass);
        } else {
            result.push(targetClass);
        }
        targetClass = superClassOfObject(targetClass);
    } while (targetClass);

    return result;
}


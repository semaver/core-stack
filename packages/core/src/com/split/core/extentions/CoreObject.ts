import {IClass} from "../types/base/IClass";
import {JsFunction} from "../types/js/JsFunction";
import {Nullable} from "../types/utility/Nullable";

/**
 * @public
 * @function to check if the given object null or undefined
 * @param obj - object of type [[unknown]]
 * @return true if object is null or undefined, if value 0 (number) return false
 */
export function isObjectEmpty(obj: unknown): boolean {
    return obj === null || obj === undefined;
}

/**
 * @public
 * @function to check if the given object is primitive
 * @param obj - object of type
 * @return true if object is primitive
 */
export function isObjectPrimitive(obj: unknown): boolean {
    return obj !== Object(obj);
}

/**
 * @public
 * @function to check if a given object is class or instance
 * @param obj - object (can be [[Nullable]])
 * @return true if a given object is class
 */
export function isObjectClass(obj: Nullable<object & { call?: JsFunction, apply?: JsFunction }>): boolean {
    return !!(obj?.constructor && obj.call && obj.apply);
}

/**
 * @public
 * @function to get the class of given object
 * @param obj - object of generic type
 * @return class [[IClass]] of the given object
 */
export function classOfObject<T extends object>(obj: IClass<T> | T): IClass<T> {
    return (isObjectClass(obj) ? obj : obj.constructor) as IClass<T>;
}

/**
 * @public
 * @function to compare two given instances and checks if they instantiated from the same class
 * @param instanceA - instance A to compare (can be [[Nullable]])
 * @param instanceB - instance B to compare (can be [[Nullable]])
 * @return true if both instances instantiated from the same class
 */
export function haveObjectsSameClass<A extends object, B extends object>(instanceA: Nullable<A>, instanceB: Nullable<B>): boolean {
    return !!(instanceA && instanceB && instanceA.constructor === instanceB.constructor);
}


/**
 * @public
 * @function to get super class of the given class
 * @param childClass - target class [[IClass]]
 * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
 * @return super class [[IClass]] of the given class or undefined
 */
export function superClassOfObject<S extends object, C extends S>(childClass: Nullable<IClass<C>>, ignoreNativeObjectClass: boolean = false): Nullable<IClass<S>> {
    const superPrototype: Nullable<object> = childClass && Reflect.getPrototypeOf(childClass.prototype as object);
    const superClass: Nullable<IClass<S>> = superPrototype?.constructor as IClass<S>;
    return (ignoreNativeObjectClass && isNativeObjectClass(superClass) ? undefined : superClass);
}

/**
 * @public
 * @function to check if class [[IClass]] is native object class
 * @param targetClass - class [[IClass]] to check
 * @return true if is native object class (targetClass === Object)
 */
export function isNativeObjectClass<T extends object>(targetClass: Nullable<IClass<T>>): boolean {
    return !!targetClass && !Reflect.getPrototypeOf(targetClass.prototype as object);
}

/**
 * @public
 * @function to get super class chain of the object (collection, first element is source class of the object)
 * @param obj - object (class or instance) as source for super class chain
 * @param reversed - flag if true source class will appear at the end of array (default value - false)
 * @param excludeNativeObjectClass - flag to exclude native object [[Object]] class from chain (default value - true)
 * @return readonly array of super classes
 */
export function getObjectSuperClassChain(obj: Nullable<object>, reversed: boolean = false, excludeNativeObjectClass: boolean = true): readonly IClass<object>[] {
    const result: IClass<object>[] = [];
    if (!obj) return result;
    let targetClass: Nullable<IClass<object>> = classOfObject(obj);

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


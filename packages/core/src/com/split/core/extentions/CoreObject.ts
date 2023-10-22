import {IClass} from "../types/base/IClass";
import {JsFunction} from "../types/js/JsFunction";
import {Nullable} from "../types/utility/Nullable";

/**
 * @public
 * @class
 * @description - class add additional functionality to Object [[Object]]
 */
export class CoreObject {
    /**
     * @public
     * @static
     * @method - to check if the given object null or undefined
     * @param obj - object of generic type
     * @return true if object is null or undefined, if value 0 (number) return false
     */
    public static isEmpty<T>(obj: T): boolean {
        return obj === null || obj === undefined;
    }

    /**
     * @public
     * @static
     * @method - to check if the given object is primitive
     * @param obj - object of generic type
     * @return true if object is primitive
     */
    public static isPrimitive<T>(obj: T): boolean {
        return obj !== Object(obj);
    }

    /**
     * @public
     * @static
     * @method - to check if a given object is class or instance
     * @param obj - object of generic type
     * @return true if a given object is class
     */
    public static isClass<T extends object>(obj: T): boolean {
        return !!(obj && obj.constructor && (obj as { call?: JsFunction, })?.call && (obj as { apply?: JsFunction })?.apply);
    }

    /**
     * @public
     * @static
     * @method - to get the class of given object
     * @param obj - object of generic type
     * @return class [[IClass]] of the given object
     */
    public static classOf<T extends object>(obj: IClass<T> | T): IClass<T> {
        return (this.isClass(obj) ? obj : obj.constructor) as IClass<T>;
    }

    /**
     * @public
     * @static
     * @method - to compare two given instances and checks if they instantiated from the same class
     * @param instanceA - instance A to compare
     * @param instanceB - instance B to compare
     * @return true if both instances instantiated from the same class
     */
    public static haveSameClass<A extends object, B extends object>(instanceA: A, instanceB: B): boolean {
        return instanceA && instanceB && instanceA.constructor === instanceB.constructor;
    }


    /**
     * @public
     * @static
     * @method - to get super class of the given class
     * @param childClass - target class [[IClass]]
     * @param ignoreNativeObjectClass - flag if set to true, native object class will be ignored and function return undefined if superclass is native object class (default value - false)
     * @return super class [[IClass]] of the given class or undefined
     */
    public static superClassOf<S extends object, C extends S>(childClass: IClass<C>, ignoreNativeObjectClass: boolean = false): Nullable<IClass<S>> {
        const superPrototype: Nullable<object> = Reflect.getPrototypeOf(childClass.prototype);
        const superClass: Nullable<IClass<S>> = superPrototype?.constructor as IClass<S>;
        return superClass && (ignoreNativeObjectClass && this.isNativeObjectClass(superClass) ? undefined : superClass);
    }

    /**
     * @public
     * @static
     * @method - to check if class [[IClass]] is native object class
     * @param targetClass - class [[IClass]] to check
     * @return true if is native object class (targetClass === Object)
     */
    public static isNativeObjectClass<T extends object>(targetClass: IClass<T>): boolean {
        return !Reflect.getPrototypeOf(targetClass.prototype);
    }

    /**
     * @public
     * @static
     * @method - to get super class chain of the object (collection, first element is source class of the object)
     * @param obj - object (class or instance) as source for super class chain
     * @param reversed - flag if true source class will appear at the end of array (default value - false)
     * @param excludeNativeObjectClass - flag to exclude native object [[Object]] class from chain (default value - true)
     * @return readonly array of super classes
     */
    public static getSuperClassChain<S extends object, C extends S>(obj: C, reversed: boolean = false, excludeNativeObjectClass: boolean = true): ReadonlyArray<IClass<S>> {
        const result: IClass<S>[] = [];
        let targetClass: Nullable<IClass<S>> = this.classOf(obj);

        do {
            if (excludeNativeObjectClass && this.isNativeObjectClass(targetClass)) {
                break;
            }
            if (reversed) {
                result.unshift(targetClass);
            } else {
                result.push(targetClass);
            }
            targetClass = this.superClassOf(targetClass);
        } while (targetClass);

        return result;
    }
}


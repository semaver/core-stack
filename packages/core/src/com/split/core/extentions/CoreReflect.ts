import {IClass} from "../types/base/IClass";
import {Nullable} from "../types/utility/Nullable";
import {classOfObject, isObjectClass, superClassOfObject} from "./CoreObject";

/**
 * @public
 * @function to check whether an object has an own property with the specified name.
 * @param obj - object that contains the property.
 * @param property - a property name.
 * @return true if property found
 */
export function hasOwnProperty(obj: Nullable<object>, property: PropertyKey): boolean {
    return !!obj && !!Reflect.getOwnPropertyDescriptor(obj, property);
}

/**
 * @public
 * @function to check whether an object has own or inherited property with the specified name.
 * @param obj - object that contains the property.
 * @param property - a property name.
 * @return true if property found
 */
export function hasProperty(obj: Nullable<object>, property: PropertyKey): boolean {
    return !!getPropertyDescriptor(obj, property);
}

/**
 * @public
 * @function to get the owner of the property
 * @param obj - object that contains the property
 * @param property  - a property name
 * @return owner of the property or undefined
 */
export function getPropertyOwner<S extends object, C extends S>(obj: Nullable<C>, property: PropertyKey): Nullable<S> {
    if (obj) {
        if (hasOwnProperty(obj, property)) {
            return obj;
        } else if (!isObjectClass(obj)) {
            let targetClass: Nullable<IClass<S>> = classOfObject(obj);
            let target: Nullable<S> = undefined;
            while (targetClass) {
                if (hasOwnProperty(targetClass.prototype as S, property)) {
                    target = targetClass.prototype as S;
                    break;
                } else {
                    targetClass = superClassOfObject(targetClass, true);
                }
            }
            return target;
        }
    }
    return undefined;
}

/**
 * @public
 * @function to get own or inherited property descriptor of the specified object.
 * @param obj - object that contains the property
 * @param property  - a property name
 * @return property descriptor Js PropertyDescriptor or undefined
 */
export function getPropertyDescriptor(obj: Nullable<object>, property: PropertyKey): Nullable<PropertyDescriptor> {
    const target: Nullable<object> = getPropertyOwner(obj, property);
    return target && Reflect.getOwnPropertyDescriptor(target, property);
}


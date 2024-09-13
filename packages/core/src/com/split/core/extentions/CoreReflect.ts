import {IClass} from "../types/base/IClass";
import {Empty} from "../types/utility/Empty";
import {classOfObject, isObjectClass, superClassOfObject} from "./CoreObject";

/**
 * function to check whether an object has an own property with the specified name
 *
 * @public
 * @param obj - object that contains the property.
 * @param property - a property key
 * @returns true if property found
 */
export function hasOwnProperty(obj: Empty<object>, property: PropertyKey): boolean {
    return !!obj && !!Reflect.getOwnPropertyDescriptor(obj, property);
}

/**
 * function to check whether an object has own or inherited property with the specified name.
 *
 * @public
 * @param obj - object that contains the property
 * @param property - a property key
 * @returns true if property found
 */
export function hasProperty(obj: Empty<object>, property: PropertyKey): boolean {
    return !!getPropertyDescriptor(obj, property);
}

/**
 * function to get the owner of the property
 *
 * @public
 * @param obj - object that contains the property
 * @param property  - a property key
 * @returns owner of the property or undefined
 */
export function getPropertyOwner<S extends object, C extends S>(obj: Empty<C>, property: PropertyKey): Empty<S> {
    if (obj) {
        if (hasOwnProperty(obj, property)) {
            return obj;
        } else if (!isObjectClass(obj)) {
            let targetClass: Empty<IClass<S>> = classOfObject(obj);
            let target: Empty<S> = undefined;
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
 * function to get own or inherited property descriptor of the specified object
 *
 * @public
 * @param obj - object that contains the property
 * @param property  - a property key
 * @returns property descriptor Js {@link PropertyDescriptor} or undefined
 */
export function getPropertyDescriptor(obj: Empty<object>, property: PropertyKey): Empty<PropertyDescriptor> {
    const target: Empty<object> = getPropertyOwner(obj, property);
    return target && Reflect.getOwnPropertyDescriptor(target, property);
}


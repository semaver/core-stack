import {IClass} from "../types/base/IClass";
import {Nullable} from "../types/utility/Nullable";
import {CoreObject} from "./CoreObject";

/**
 * @public
 * @class
 * @description - class add additional functionality to Reflect JS/TS API
 */
export class CoreReflect {
    /**
     * @public
     * @static
     * @method - to check whether an object has an own property with the specified name.
     * @param obj - object that contains the property.
     * @param property - a property name.
     * @return true if property found
     */
    public static hasOwn<T extends object>(obj: T, property: PropertyKey): boolean {
        return !!Reflect.getOwnPropertyDescriptor(obj, property);
    }

    /**
     * @public
     * @static
     * @method - to check whether an object has own or inherited property with the specified name.
     * @param obj - object that contains the property.
     * @param property - a property name.
     * @return true if property found
     */
    public static has<T extends object>(obj: T, property: PropertyKey): boolean {
        return !!this.getDescriptor(obj, property);
    }

    /**
     * @public
     * @static
     * @method - to get the owner of the property
     * @param obj - object that contains the property
     * @param property  - a property name
     * @return owner of the property or undefined
     */
    public static getOwner<S extends object, C extends S>(obj: C, property: PropertyKey): Nullable<S> {
        if (obj) {
            if (this.hasOwn(obj, property)) {
                return obj;
            } else if (!CoreObject.isClass(obj)) {
                let targetClass: Nullable<IClass<S>> = CoreObject.classOf(obj);
                let target: Nullable<S> = undefined;
                while (targetClass) {
                    if (this.hasOwn(targetClass.prototype, property)) {
                        target = targetClass.prototype;
                        break;
                    } else {
                        targetClass = CoreObject.superClassOf(targetClass, true);
                    }
                }
                return target;
            }
        }
        return undefined;
    }

    /**
     * @public
     * @static
     * @method - to get own or inherited property descriptor of the specified object.
     * @param obj - object that contains the property
     * @param property  - a property name
     * @return property descriptor Js PropertyDescriptor or undefined
     */
    public static getDescriptor<T extends object>(obj: T, property: PropertyKey): Nullable<PropertyDescriptor> {
        const target: Nullable<object> = this.getOwner(obj, property);
        return target && Reflect.getOwnPropertyDescriptor(target, property);
    }
}


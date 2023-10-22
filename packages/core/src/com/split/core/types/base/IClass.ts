import {JsFunction} from "../js/JsFunction";
import {EmptyGeneric} from "../utility/EmptyGeneric";

/**
 * @public
 * @interface
 * @description -  definition of generic class
 * @extends [[JsFunction]] [[EmptyGeneric]]
 */
export interface IClass<T> extends JsFunction, EmptyGeneric<T> {
    /**
     * @public
     * @description - newable declaration for class, required for instantiation
     * @param args - any number of args that can be passed to the constructor
     */
    new(...args: any[]): T;
}
import {JsFunction} from "../js/JsFunction";
import {EmptyGeneric} from "../utility/EmptyGeneric";

/**
 * definition of generic class
 *
 * @public
 * @interface
 */
export interface IClass<T> extends JsFunction, EmptyGeneric<T> {
    /**
     * newable declaration for class, required for instantiation
     *
     * @public
     * @param args - any number of args that can be passed to the constructor
     */
    new(...args: any[]): T;
}

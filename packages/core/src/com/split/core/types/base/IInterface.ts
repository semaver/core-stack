import {EmptyGeneric} from "../utility/EmptyGeneric";

/**
 * @public
 * @interface
 * @description - definition of generic interface
 * @extends [[EmptyGeneric]]
 */
export interface IInterface<T> extends EmptyGeneric<T> {
    /**
     * @public
     * @property uid - unique identifier for the interface based on JS symbol
     */
    readonly uid: symbol;
}

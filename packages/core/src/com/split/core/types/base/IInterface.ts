import {EmptyGeneric} from "../utility/EmptyGeneric";

/**
 * definition of generic interface
 *
 * @public
 * @interface
 * @see {@link InterfaceSymbol}
 */
export interface IInterface<T> extends EmptyGeneric<T> {
    /**
     * @public
     * @property uid - unique identifier for the interface based on JS symbol
     */
    readonly uid: symbol;
}

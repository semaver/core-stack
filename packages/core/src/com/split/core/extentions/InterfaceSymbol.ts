import {IInterface} from "../types/base/IInterface";
import {isObjectEmpty} from "./CoreObject";

/**
 * implementation of generic Interface Symbol to "materialize" interface and avoid "only refers to a type, but is being used as a value" Error
 *
 * @public
 */
export class InterfaceSymbol<T> implements IInterface<T> {

    /**
     * @private
     * @property pool of all interface symbols
     */
    private static pool: Map<symbol, InterfaceSymbol<unknown>> = new Map<symbol, InterfaceSymbol<unknown>>();
    /**
     * @public
     * @readonly
     * @property unique identifier of interface symbol
     */
    public readonly uid: symbol;

    /**
     * @private
     * @param uid - unique identifier of type symbol
     */
    private constructor(uid: symbol) {
        this.uid = uid;
    }

    /**
     * method to create or get interface symbol by unique identifier
     *
     * @public
     * @param uid - unique identifier
     * @returns interface symbol if found
     */
    public static for<T>(uid: string | symbol): IInterface<T> {
        if (isObjectEmpty(uid)) {
            throw new Error("InterfaceSymbol: name is null or undefined");
        }

        if (typeof uid === "string") {
            uid = Symbol.for(uid);
        }

        const symbol: IInterface<T> = InterfaceSymbol.pool.get(uid) ?? new InterfaceSymbol(uid);

        if (!InterfaceSymbol.pool.has(uid)) {
            InterfaceSymbol.pool.set(uid, symbol);
        }
        return symbol;
    }
}

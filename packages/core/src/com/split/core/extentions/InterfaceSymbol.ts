import {IInterface} from "../types/base/IInterface";
import {CoreObject} from "./CoreObject";

/**
 * @public
 * @class
 * @implements [[IInterface]]
 * @description - implementation of generic Interface Symbol to "materialize" interface and avoid "only refers to a type, but is being used as a value" Error
 */
export class InterfaceSymbol<T> implements IInterface<T> {

    /**
     * @public
     * @static
     * @method to create or get interface symbol [[InterfaceSymbol]]
     * @param uid - unique identifier
     * @return interface symbol if found
     */
    public static for<T>(uid: string | symbol): IInterface<T> {
        if (CoreObject.isEmpty(uid)) {
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

    /**
     * @private
     * @static
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
     * @constructor
     * @param uid - unique identifier of type [[symbol]]
     */
    private constructor(uid: symbol) {
        this.uid = uid;
    }
}

import {IInterface} from "../types/base/IInterface";
import {isObjectEmpty} from "./CoreObject";

/**
 * class that "materializes" a TypeScript interface into a runtime value (an {@link IInterface}) so it can be used where a value is required, avoiding the "only refers to a type, but is being used as a value" error. Instances are keyed by a unique symbol and pooled, so the same identifier always yields the same interface symbol. Created via the static {@link InterfaceSymbol.for} factory rather than the constructor.
 *
 * @public
 */
export class InterfaceSymbol<T> implements IInterface<T> {

    /**
     * @private
     * @property pool of all interface symbols
     */
    private static readonly pool: Map<symbol, InterfaceSymbol<unknown>> = new Map<symbol, InterfaceSymbol<unknown>>();
    /**
     * @public
     * @readonly
     * @property unique identifier of interface symbol
     */
    public readonly uid: symbol;

    /**
     * @private
     * @param uid - unique identifier of interface symbol
     */
    private constructor(uid: symbol) {
        this.uid = uid;
    }

    /**
     * method to get the pooled interface symbol for a unique identifier, creating and caching it on first use so repeated calls with the same identifier return the same instance. A string identifier is resolved to a global symbol via `Symbol.for` before lookup.
     *
     * @public
     * @param uid - unique identifier
     * @returns the interface symbol associated with the given identifier
     * @throws Error if the identifier is null or undefined
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

import {IClassTableSubscriber} from "./IClassTableSubscriber";
import {IClass} from "@semaver/core";

/**
 * interface for class wrapper
 *
 * @public
 * @interface
 */
export interface IClassTable {

    /**
     * method to get the read-only set of classes registered in the class table; a class is included only once it carries its own metadata (added when it is decorated, e.g. via `metaclass()` or any member/parameter decorator).
     *
     * @public
     * @returns readonly set of classes
     */
    getClasses(): ReadonlySet<IClass<object>>;

    /**
     * method to get the class table's synchronization hash; the hash changes whenever a metadata class is added to, updated with own metadata, or removed from the class table, so compare hashes to detect whether the table changed.
     *
     * @public
     * @returns synchronization hash of the class table
     */
    getSyncHash(): string;

    /**
     * method to add subscribers to metadata class table
     *
     * @public
     * @param subscribers - args collection of subscribers
     * @returns instance of current class table
     */
    subscribe(...subscribers: IClassTableSubscriber[]): this

    /**
     * method to remove subscribers from metadata class table
     *
     * @public
     * @param subscribers - args collection of subscribers
     * @returns instance of current class table
     */
    unsubscribe(...subscribers: IClassTableSubscriber[]): this
}

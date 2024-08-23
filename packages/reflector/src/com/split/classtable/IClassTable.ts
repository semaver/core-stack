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
     * method to get a collection of classes containing own metadata
     *
     * @public
     * @returns readonly set of classes
     */
    getClasses(): ReadonlySet<IClass<object>>;

    /**
     * method to get synchronization hash
     *
     * @public
     * @returns string of synchronization hash
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

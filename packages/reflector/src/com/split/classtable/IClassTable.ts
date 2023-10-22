import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {IClassTableSubscriber} from "./IClassTableSubscriber";

/**
 * @public
 * @interface
 * @description interface for class wrapper
 */
export interface IClassTable {

    /**
     * @public
     * @method to get collection of classes containing own metadata
     * @return readonly set of classes
     */
    getClasses(): ReadonlySet<IMetadataClass<unknown>>;

    /**
     * @public
     * @method to get synchronisation hash
     * @return string of synchronisation hash
     */
    getSyncHash(): string;

    /**
     * @public
     * @method to add subscribers to metadata class table
     * @param subscribers - args collection of subscribers [[IClassTableSubscriber]]
     * @return instance of current class table
     */
    subscribe(...subscribers: IClassTableSubscriber[]): this

    /**
     * @public
     * @method to remove subscribers from metadata class table
     * @param subscribers - args collection of subscribers [[IClassTableSubscriber]]
     * @return instance of current class table
     */
    unsubscribe(...subscribers: IClassTableSubscriber[]): this
}
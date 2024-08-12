import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {IClassTableSubscriber} from "./IClassTableSubscriber";

/**
 * class table reference, only classes with own metadata are registered in classtable
 *
 * @public
 * @interface
 */
export interface IClassTableRef {

    /**
     * @public
     * @property _sync_hash - sync hash of classtable (hash is updated each time any metadata class added to class table, updated with own metadata, or removed from class table)
     */
    _sync_hash: string;

    /**
     * @public
     * @property _classes - set of metadata classes registered in class table
     */
    _classes: Set<IMetadataClass<unknown>>

    /**
     * @public
     * @property _subscribers - set of subscribers registered in class table
     */
    _subscribers: Set<IClassTableSubscriber>

}

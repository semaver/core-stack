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
     * @property _protocol_version - version of the class table storage FORMAT (not the package semver). Stamped when the registry is first created and compared by every other library copy that finds an existing registry; a mismatch means two copies with an incompatible storage layout share one globalThis, which is reported via console.warn so the ambiguity is visible instead of silently merged.
     */
    _protocol_version: number;

    /**
     * @public
     * @property _sync_hash - sync hash of classtable (hash is updated each time any metadata class added to class table, updated with own metadata, or removed from class table)
     */
    _sync_hash: string;

    /**
     * @public
     * @property _classes - set of metadata classes registered in class table
     */
    _classes: Set<IMetadataClass<object>>

    /**
     * @public
     * @property _subscribers - set of subscribers registered in class table
     */
    _subscribers: Set<IClassTableSubscriber>

}

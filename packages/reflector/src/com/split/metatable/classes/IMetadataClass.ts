import {IClass, Empty} from "@semaver/core";
import {IMetadataTableRef} from "../metadata/IMetadataTableRef";

/**
 * metadata class names used to define metadata properties
 *
 * @public
 * @enum
 */
export enum MetadataClassNames {
    OWN_HASH = "__own_hash__",
    PARENT_HASH = "__parent_hash__",
    METADATA = "__metadata__",
    CACHED_METADATA = "__cached_metadata__",
}

/**
 * interface representing a class augmented with reflector metadata: extends {@link IClass} with reflector-managed properties that store the class's own decorator metadata table ({@link __metadata__}), a cache of the fully proceeded metadata computed after applying policies and merging inherited (superclass) metadata ({@link __cached_metadata__}), and own/parent hashes ({@link __own_hash__}, {@link __parent_hash__}) compared to detect when the cached table is stale and must be recomputed.
 *
 * @public
 * @interface
 */
export interface IMetadataClass<T> extends IClass<T> {

    /**
     * @public
     * @property __own_hash__ - hash of this class's own metadata table, regenerated whenever own metadata is added, removed, or recalculated; compared against a stored hash to detect changes and trigger invalidation/recomputation of the cached (policy-processed) metadata table.
     */
    __own_hash__: string;

    /**
     * @public
     * @property __parent_hash__ - snapshot of the parent (super) class's own hash taken when this class's cached metadata was last computed; compared against the parent's current own hash to detect changes in inherited metadata and invalidate this class's cached metadata. Undefined until first computed, and set equal to own hash for a root class with no metadata parent.
     */
    __parent_hash__: Empty<string>;
    /**
     * @public
     * @property __metadata__ - metadata table containing only own original metadata
     */
    __metadata__: IMetadataTableRef;

    /**
     * @public
     * @property __cached_metadata__ - metadata table containing proceeded metadata based on different policies
     */
    __cached_metadata__: Empty<IMetadataTableRef>;
}

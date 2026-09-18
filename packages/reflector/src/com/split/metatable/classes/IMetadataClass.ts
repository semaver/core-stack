import {IClass, Empty} from "@semaver/core";
import {IMetadataTableRef} from "../metadata/IMetadataTableRef";

/**
 * cross-realm global symbols (`Symbol.for`) backing the metadata class names.
 *
 * they are declared with an explicit `unique symbol` type (and consumed through
 * `typeof` in {@link MetadataClassNamesType}) so each stays a distinct, named
 * property key. typed as a plain `symbol`, several symbol-keyed members would
 * collapse into a single symbol index signature on {@link IMetadataClass}, which
 * then clashes with the well-known symbols ({@link Symbol.hasInstance},
 * {@link Symbol.metadata}) inherited from the class constructor type.
 */
const OWN_HASH: unique symbol = Symbol.for("@semaver/reflector/own_hash");
const PARENT_HASH: unique symbol = Symbol.for("@semaver/reflector/parent_hash");
const METADATA: unique symbol = Symbol.for("@semaver/reflector/metadata");
const CACHED_METADATA: unique symbol = Symbol.for("@semaver/reflector/cached_metadata");

/**
 * shape of the metadata class names holder
 *
 * @public
 * @interface
 */
export interface MetadataClassNamesType {
    readonly OWN_HASH: typeof OWN_HASH;
    readonly PARENT_HASH: typeof PARENT_HASH;
    readonly METADATA: typeof METADATA;
    readonly CACHED_METADATA: typeof CACHED_METADATA;
}

/**
 * union of the metadata class name key values (the `Symbol.for`-backed
 * property keys) held by `MetadataClassNames`.
 *
 * @public
 */
export type MetadataClassNamesValues = MetadataClassNamesType[keyof MetadataClassNamesType];

/**
 * metadata class names used to define metadata properties.
 *
 * keys are cross-realm global symbols (`Symbol.for`) rather than raw
 * strings: they never collide with user-land property names, never leak into
 * string-key enumeration, and resolve to the same symbol across duplicate
 * library copies so metadata written by one copy is readable by another.
 *
 * @public
 * @enum
 */
export const MetadataClassNames: MetadataClassNamesType = Object.freeze({
    OWN_HASH,
    PARENT_HASH,
    METADATA,
    CACHED_METADATA,
});

/**
 * interface representing a class augmented with reflector metadata: extends {@link IClass} with reflector-managed properties that store the class's own decorator metadata table (`MetadataClassNames.METADATA`), a cache of the fully proceeded metadata computed after applying policies and merging inherited (superclass) metadata (`MetadataClassNames.CACHED_METADATA`), and own/parent hashes (`MetadataClassNames.OWN_HASH`, `MetadataClassNames.PARENT_HASH`) compared to detect when the cached table is stale and must be recomputed.
 *
 * @public
 * @interface
 */
export interface IMetadataClass<T> extends IClass<T> {

    /**
     * @public
     * @property [MetadataClassNames.OWN_HASH] - hash of this class's own metadata table, regenerated whenever own metadata is added, removed, or recalculated; compared against a stored hash to detect changes and trigger invalidation/recomputation of the cached (policy-processed) metadata table.
     */
    [MetadataClassNames.OWN_HASH]: string;

    /**
     * @public
     * @property [MetadataClassNames.PARENT_HASH] - snapshot of the parent (super) class's own hash taken when this class's cached metadata was last computed; compared against the parent's current own hash to detect changes in inherited metadata and invalidate this class's cached metadata. Undefined until first computed, and set equal to own hash for a root class with no metadata parent.
     */
    [MetadataClassNames.PARENT_HASH]: Empty<string>;

    /**
     * @public
     * @property [MetadataClassNames.METADATA] - metadata table containing only own original metadata
     */
    [MetadataClassNames.METADATA]: IMetadataTableRef;

    /**
     * @public
     * @property [MetadataClassNames.CACHED_METADATA] - metadata table containing proceeded metadata based on different policies
     */
    [MetadataClassNames.CACHED_METADATA]: Empty<IMetadataTableRef>;
}

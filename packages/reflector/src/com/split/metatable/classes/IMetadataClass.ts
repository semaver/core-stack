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
 * interface that represents class with metadata
 *
 * @public
 * @interface
 */
export interface IMetadataClass<T> extends IClass<T> {

    /**
     * @public
     * @property __own_hash__ used to track changes of metadata
     */
    __own_hash__: string;

    /**
     * @public
     * @property __parent_hash__ used to track changes of metadata
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

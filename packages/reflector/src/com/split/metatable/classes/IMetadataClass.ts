import {IClass, Nullable} from "@semaver/core";
import {IMetadataTableRef} from "../metadata/IMetadataTableRef";

/**
 * @public
 * @enum
 * @description - metadata class names used to define metadata properties
 */
export enum MetadataClassNames {
    OWN_HASH = "__own_hash__",
    PARENT_HASH = "__parent_hash__",
    METADATA = "__metadata__",
    CACHED_METADATA = "__cached_metadata__",
}

/**
 * @public
 * @interface
 * @extends [[IClass]]
 * @description - interface that represent class with metadata
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
    __parent_hash__: Nullable<string>;
    /**
     * @public
     * @property __metadata__ - metadata table containing only own original metadata
     */
    __metadata__: IMetadataTableRef;

    /**
     * @public
     * @property __cached_metadata__ - metadata table containing proceeded metadata based on different policies
     */
    __cached_metadata__: Nullable<IMetadataTableRef>;
}

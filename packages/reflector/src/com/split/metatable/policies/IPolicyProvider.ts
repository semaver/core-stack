import {MetadataAccessPolicy, PrimitiveMetadataAccessPolicy} from "./MetadataAccessPolicy";
import {MetadataAppearancePolicy} from "./MetadataAppearancePolicy";
import {MetadataCollisionPolicy} from "./MetadataCollisionPolicy";
import {MetadataNotExistencePolicy} from "./MetadataNotExistencePolicy";
import {MetadataSameTargetMultiUsagePolicy} from "./MetadataSameTargetMultiUsagePolicy";


/**
 * @public
 * @interface
 * @description - definition of policy provider interface
 */
export interface IPolicyProvider {
    /**
     * @public
     * @method to get current access policy
     * @return metadata access policy [[MetadataAccessPolicy]]
     */
    getAccessPolicy(): MetadataAccessPolicy;

    /**
     * @public
     * @method to get current appearance policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     * @return metadata appearance policy [[MetadataAppearancePolicy]]
     */
    getAppearancePolicy(access: PrimitiveMetadataAccessPolicy): MetadataAppearancePolicy;

    /**
     * @public
     * @method to get current collision policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     * @return metadata collision policy [[MetadataCollisionPolicy]]
     */
    getCollisionPolicy(access: PrimitiveMetadataAccessPolicy): MetadataCollisionPolicy;

    /**
     * @public
     * @method to get current not existence policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     * @return metadata collision policy [[MetadataNotExistencePolicy]]
     */
    getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy): MetadataNotExistencePolicy;

    /**
     * @public
     * @method to get current same target multi usage policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     * @return metadata same target multi usage policy [[MetadataSameTargetMultiUsagePolicy]]
     */
    getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy): MetadataSameTargetMultiUsagePolicy;

    /**
     * @public
     * @method to check if access policy provided
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     * @return if access policy provided
     */
    hasAccessPolicy(access: PrimitiveMetadataAccessPolicy): boolean;
}


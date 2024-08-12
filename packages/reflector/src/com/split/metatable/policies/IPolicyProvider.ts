import {MetadataAccessPolicyValues, PrimitiveMetadataAccessPolicyValues} from "./MetadataAccessPolicy";
import {MetadataAppearancePolicyValues} from "./MetadataAppearancePolicy";
import {MetadataCollisionPolicyValues} from "./MetadataCollisionPolicy";
import {MetadataNotExistencePolicyValues} from "./MetadataNotExistencePolicy";
import {MetadataSameTargetMultiUsagePolicyValues} from "./MetadataSameTargetMultiUsagePolicy";


/**
 * @public
 * @interface
 * @description - definition of policy provider interface
 */
export interface IPolicyProvider {
    /**
     * @public
     * @method to get current access policy
     * @return metadata access policy [[MetadataAccessPolicyValues]]
     */
    getAccessPolicy(): MetadataAccessPolicyValues;

    /**
     * @public
     * @method to get current appearance policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return metadata appearance policy [[MetadataAppearancePolicyValues]]
     */
    getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataAppearancePolicyValues;

    /**
     * @public
     * @method to get current collision policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return metadata collision policy [[MetadataCollisionPolicyValues]]
     */
    getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataCollisionPolicyValues;

    /**
     * @public
     * @method to get current not existence policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return metadata collision policy [[MetadataNotExistencePolicyValues]]
     */
    getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataNotExistencePolicyValues;

    /**
     * @public
     * @method to get current same target multi usage policy by providing access
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return metadata same target multi usage policy [[MetadataSameTargetMultiUsagePolicyValues]]
     */
    getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataSameTargetMultiUsagePolicyValues;

    /**
     * @public
     * @method to check if access policy provided
     * @param access - primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return if access policy provided
     */
    hasAccessPolicy(access: PrimitiveMetadataAccessPolicyValues): boolean;
}


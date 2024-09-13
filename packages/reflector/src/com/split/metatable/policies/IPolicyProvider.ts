import {MetadataAccessPolicyValues, PrimitiveMetadataAccessPolicyValues} from "./MetadataAccessPolicy";
import {MetadataAppearancePolicyValues} from "./MetadataAppearancePolicy";
import {MetadataCollisionPolicyValues} from "./MetadataCollisionPolicy";
import {MetadataNotExistencePolicyValues} from "./MetadataNotExistencePolicy";
import {MetadataSameTargetMultiUsagePolicyValues} from "./MetadataSameTargetMultiUsagePolicy";


/**
 * definition of policy provider interface
 *
 * @public
 * @interface
 */
export interface IPolicyProvider {
    /**
     * method to get current access policy
     *
     * @public
     * @returns metadata access policy
     */
    getAccessPolicy(): MetadataAccessPolicyValues;

    /**
     * method to get current appearance policy by providing access
     *
     * @public
     * @param access - primitive metadata access policy
     * @returns metadata appearance policy
     */
    getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataAppearancePolicyValues;

    /**
     * method to get current collision policy by providing access
     *
     * @public
     * @param access - primitive metadata access policy
     * @returns metadata collision policy
     */
    getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataCollisionPolicyValues;

    /**
     * method to get current not existence policy by providing access
     *
     * @public
     * @param access - primitive metadata access policy
     * @returns metadata collision policy
     */
    getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataNotExistencePolicyValues;

    /**
     * method to get current same target multi usage policy by providing access
     *
     * @public
     * @param access - primitive metadata access policy
     * @returns metadata same target multi usage policy
     */
    getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataSameTargetMultiUsagePolicyValues;

    /**
     * method to check if access policy provided
     *
     * @public
     * @param access - primitive metadata access policy
     * @returns if access policy provided
     */
    hasAccessPolicy(access: PrimitiveMetadataAccessPolicyValues): boolean;
}


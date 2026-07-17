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
     * method to get the current access policy, i.e. the bitmask of member kinds this
     * provider/decorator applies to
     *
     * @public
     * @returns the metadata access policy value, a bitwise-OR combination of member-kind bits
     * (e.g. `MetadataAccessPolicy.ALL` by default); tested against a member's access via a bitwise AND
     */
    getAccessPolicy(): MetadataAccessPolicyValues;

    /**
     * method to get the appearance policy configured for a single primitive access (member kind).
     *
     * @public
     * @param access - a single primitive metadata access value identifying the member kind (e.g. INSTANCE_METHOD)
     * @returns the appearance policy configured for that access, or MetadataAppearancePolicy.DEFAULT if none was set
     */
    getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataAppearancePolicyValues;

    /**
     * method to get the collision policy configured for a single member kind.
     *
     * @public
     * @param access - a single primitive access bit identifying the member kind (e.g. INSTANCE_METHOD)
     * @returns the collision policy set for that member kind, or MetadataCollisionPolicy.DEFAULT if none was configured
     */
    getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataCollisionPolicyValues;

    /**
     * method to get the not-existence policy configured for a single member kind.
     *
     * The not-existence policy decides whether a superclass decorator is applied to a child-class
     * member that itself has no decorator of the same type (SKIP or APPLY).
     *
     * @public
     * @param access - a single primitive access bit identifying the member kind (e.g. INSTANCE_METHOD)
     * @returns the not-existence policy set for that member kind, or MetadataNotExistencePolicy.DEFAULT if none was configured
     */
    getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataNotExistencePolicyValues;

    /**
     * method to get the same-target multi-usage policy configured for a given member kind, i.e.
     * whether multiple decorators of the same type on one member are all registered (ALLOWED) or
     * only the first (NOT_ALLOWED).
     *
     * @public
     * @param access - a single primitive access bit identifying the member kind (e.g. INSTANCE_METHOD)
     * @returns the same-target multi-usage policy set for that member kind, or MetadataSameTargetMultiUsagePolicy.DEFAULT if none was configured
     */
    getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataSameTargetMultiUsagePolicyValues;

    /**
     * method to check whether the given member or parameter kind is covered by this provider's
     * configured access policy (tested via bitwise intersection of the access masks).
     *
     * @public
     * @param access - a single primitive access bit identifying the member or parameter kind to test
     * @returns true if the given kind is included in this provider's access policy
     */
    hasAccessPolicy(access: PrimitiveMetadataAccessPolicyValues): boolean;
}


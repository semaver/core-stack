import {IPolicyProvider} from "./IPolicyProvider";
import {
    MetadataAccessPolicy,
    MetadataAccessPolicyValues,
    PrimitiveMetadataAccessPolicyValues
} from "./MetadataAccessPolicy";
import {MetadataAppearancePolicy, MetadataAppearancePolicyValues} from "./MetadataAppearancePolicy";
import {MetadataCollisionPolicy, MetadataCollisionPolicyValues} from "./MetadataCollisionPolicy";
import {MetadataNotExistencePolicy, MetadataNotExistencePolicyValues} from "./MetadataNotExistencePolicy";
import {
    MetadataSameTargetMultiUsagePolicy,
    MetadataSameTargetMultiUsagePolicyValues
} from "./MetadataSameTargetMultiUsagePolicy";

/**
 * implementation of policy provider that can be used for advanced policy configuration
 *
 * @public
 */
export class PolicyProvider implements IPolicyProvider {
    /**
     * @protected
     * @readonly
     * @property access - access policy
     */
    protected readonly access: MetadataAccessPolicyValues;

    /**
     * @protected
     * @readonly
     * @property appearance - map of metadata appearance policy by primitive metadata access policy
     */
    protected readonly appearance: Map<PrimitiveMetadataAccessPolicyValues, MetadataAppearancePolicyValues> = new Map<PrimitiveMetadataAccessPolicyValues, MetadataAppearancePolicyValues>();
    /**
     * @protected
     * @readonly
     * @property collision - map of metadata collision policy by primitive metadata access policy
     */
    protected collision: Map<PrimitiveMetadataAccessPolicyValues, MetadataCollisionPolicyValues> = new Map<PrimitiveMetadataAccessPolicyValues, MetadataCollisionPolicyValues>();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata not existence policy by primitive metadata access policy
     */
    protected notExistence: Map<PrimitiveMetadataAccessPolicyValues, MetadataNotExistencePolicyValues> = new Map<PrimitiveMetadataAccessPolicyValues, MetadataNotExistencePolicyValues>();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata same target multi usage policy by primitive metadata access policy
     */
    protected sameTargetMultiUsage: Map<PrimitiveMetadataAccessPolicyValues, MetadataSameTargetMultiUsagePolicyValues> = new Map<PrimitiveMetadataAccessPolicyValues, MetadataSameTargetMultiUsagePolicyValues>();

    /**
     * @public
     * @param access - metadata access policy default value - ALL
     */
    public constructor(access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL) {
        this.access = access;
        this.setDefault();
    }

    /**
     * method to set default values for all policies based on access provided in constructor
     *
     * @public
     * @returns current instance of policy provider
     */
    public setDefault(): this {
        return this
            .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT, this.access)
            .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT, this.access)
            .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT, this.access)
            .setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.DEFAULT, this.access);

    }

    /**
     * method to set appearance policy based on access provided in constructor, all values will be deleted and new values set
     *
     * @public
     * @param value - value to apply to metadata appearance policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public setAppearancePolicy(value: MetadataAppearancePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.appearance.clear();
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * method to set collision policy based on access provided in constructor, old values will be deleted and new values set
     *
     * @public
     * @param value - value to apply to metadata collision policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public setCollisionPolicy(value: MetadataCollisionPolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.collision.clear();
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * method to set not existence policy based on access provided in constructor, old values will be deleted and new values set
     *
     * @public
     * @param value - value to apply to metadata not existence policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public setNotExistencePolicy(value: MetadataNotExistencePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.notExistence.clear();
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * method to set same target multi usage policy based on access provided in constructor, old values will be deleted and new values set
     *
     * @public
     * @param value - value to apply to metadata same target multi usage policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public setSameTargetMultiUsagePolicy(value: MetadataSameTargetMultiUsagePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.sameTargetMultiUsage.clear();
        return this.addPolicy(this.sameTargetMultiUsage, value, access);
    }

    /**
     * method to add appearance policy based on access provided in constructor, old values will be updated
     *
     * @public
     * @param value - value to apply to metadata appearance policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public addAppearancePolicy(value: MetadataAppearancePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * method to add collision policy based on access provided in constructor, old values will be updated
     *
     * @public
     * @param value - value to apply to metadata collision policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public addCollisionPolicy(value: MetadataCollisionPolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * method to add not existence policy based on access provided in constructor, old values will be updated
     *
     * @public
     * @param value - value to apply to metadata not existence policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public addNotExistencePolicy(value: MetadataNotExistencePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * method to add same target multi usage policy based on access provided in constructor, old values will be updated
     *
     * @public
     * @param value - value to apply to metadata same target multi usage policy
     * @param access - metadata access policy, default value - ALL
     * @returns current instance of policy provider
     */
    public addSameTargetMultiUsagePolicy(value: MetadataSameTargetMultiUsagePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.sameTargetMultiUsage, value, access);
    }

    /**
     * @inheritDoc
     */
    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataAppearancePolicyValues {
        return this.appearance.get(access) ?? MetadataAppearancePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataCollisionPolicyValues {
        return this.collision.get(access) ?? MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataNotExistencePolicyValues {
        return this.notExistence.get(access) ?? MetadataNotExistencePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataSameTargetMultiUsagePolicyValues {
        return this.sameTargetMultiUsage.get(access) ?? MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return this.access;
    }

    /**
     * @inheritDoc
     */
    public hasAccessPolicy(access: PrimitiveMetadataAccessPolicyValues): boolean {
        return (this.access & access) > 0;
    }

    /**
     * method to add generic policy based on access provided in constructor
     *
     * @protected
     * @param map - map of metadata policy
     * @param value - value to apply to metadata policy
     * @param access - metadata access policy
     * @returns current instance of policy provider
     */
    protected addPolicy(map: Map<PrimitiveMetadataAccessPolicyValues, unknown>, value: unknown, access: MetadataAccessPolicyValues): this {
        let currentAccess: MetadataAccessPolicyValues = this.access & access;
        let key: number = 1;
        while (currentAccess) {
            const bit: number = currentAccess & 1;
            if (bit) {
                map.set(key, value);
            }
            currentAccess >>= 1;
            key <<= 1;
        }
        return this;
    }
}

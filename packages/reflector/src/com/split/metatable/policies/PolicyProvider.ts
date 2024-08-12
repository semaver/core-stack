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
 * @public
 * @class
 * @implements [[IPolicyProvider]]
 * @description - implementation of policy provider
 */
export class PolicyProvider implements IPolicyProvider {
    /**
     * @protected
     * @readonly
     * @property access - access policy [[MetadataAccessPolicyValues]]
     */
    protected readonly access: MetadataAccessPolicyValues;

    /**
     * @protected
     * @readonly
     * @property appearance - map of metadata appearance policy [[MetadataAppearancePolicyValues]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     */
    protected readonly appearance = new Map<PrimitiveMetadataAccessPolicyValues, MetadataAppearancePolicyValues>();
    /**
     * @protected
     * @readonly
     * @property collision - map of metadata collision policy [[MetadataCollisionPolicyValues]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     */
    protected collision = new Map<PrimitiveMetadataAccessPolicyValues, MetadataCollisionPolicyValues>();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata not existence policy [[MetadataNotExistencePolicyValues]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     */
    protected notExistence = new Map<PrimitiveMetadataAccessPolicyValues, MetadataNotExistencePolicyValues>();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata same target multi usage policy [[MetadataSameTargetMultiUsagePolicyValues]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicyValues]]
     */
    protected sameTargetMultiUsage = new Map<PrimitiveMetadataAccessPolicyValues, MetadataSameTargetMultiUsagePolicyValues>();

    /**
     * @public
     * @constructor
     * @param access - metadata access policy [[MetadataAccessPolicyValues]] default value - ALL
     */
    public constructor(access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL) {
        this.access = access;
        this.setDefault();
    }

    /**
     * @public
     * @method to set default values for all policies based on access provided in constructor
     * @return current instance of policy provider
     */
    public setDefault(): this {
        return this
            .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT, this.access)
            .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT, this.access)
            .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT, this.access)
            .setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.DEFAULT, this.access);

    }

    /**
     * @public
     * @method to set appearance policy based on access provided in constructor, all values will be deleted and new values set
     * @param value - value [[MetadataAppearancePolicyValues]] to apply to metadata appearance policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public setAppearancePolicy(value: MetadataAppearancePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.appearance.clear();
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * @public
     * @method to set collision policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataCollisionPolicyValues]] to apply to metadata collision policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public setCollisionPolicy(value: MetadataCollisionPolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.collision.clear();
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * @public
     * @method to set not existence policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataNotExistencePolicyValues]] to apply to metadata not existence policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public setNotExistencePolicy(value: MetadataNotExistencePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.notExistence.clear();
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * @public
     * @method to set same target multi usage policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataSameTargetMultiUsagePolicyValues]] to apply to metadata same target multi usage policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public setSameTargetMultiUsagePolicy(value: MetadataSameTargetMultiUsagePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        this.sameTargetMultiUsage.clear();
        return this.addPolicy(this.sameTargetMultiUsage, value, access);
    }

    /**
     * @public
     * @method to add appearance policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataAppearancePolicyValues]] to apply to metadata appearance policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public addAppearancePolicy(value: MetadataAppearancePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * @public
     * @method to add collision policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataCollisionPolicyValues]] to apply to metadata collision policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public addCollisionPolicy(value: MetadataCollisionPolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * @public
     * @method to add not existence policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataNotExistencePolicyValues]] to apply to metadata not existence policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
     */
    public addNotExistencePolicy(value: MetadataNotExistencePolicyValues, access: MetadataAccessPolicyValues = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * @public
     * @method to add same target multi usage policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataSameTargetMultiUsagePolicyValues]] to apply to metadata same target multi usage policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]], default value - ALL
     * @return current instance of policy provider
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
     * @protected
     * @method to add generic policy
     * @param map - map of metadata policy
     * @param value - value to apply to metadata policy
     * @param access - metadata access policy [[MetadataAccessPolicyValues]]
     * @return current instance of policy provider
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

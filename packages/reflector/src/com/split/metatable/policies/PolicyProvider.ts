import {IPolicyProvider} from "./IPolicyProvider";
import {MetadataAccessPolicy, PrimitiveMetadataAccessPolicy} from "./MetadataAccessPolicy";
import {MetadataAppearancePolicy} from "./MetadataAppearancePolicy";
import {MetadataCollisionPolicy} from "./MetadataCollisionPolicy";
import {MetadataNotExistencePolicy} from "./MetadataNotExistencePolicy";
import {MetadataSameTargetMultiUsagePolicy} from "./MetadataSameTargetMultiUsagePolicy";

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
     * @property access - access policy [[MetadataAccessPolicy]]
     */
    protected readonly access: MetadataAccessPolicy;

    /**
     * @protected
     * @readonly
     * @property appearance - map of metadata appearance policy [[MetadataAppearancePolicy]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     */
    protected readonly appearance: Map<PrimitiveMetadataAccessPolicy, MetadataAppearancePolicy> = new Map();
    /**
     * @protected
     * @readonly
     * @property collision - map of metadata collision policy [[MetadataCollisionPolicy]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     */
    protected collision: Map<PrimitiveMetadataAccessPolicy, MetadataCollisionPolicy> = new Map();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata not existence policy [[MetadataNotExistencePolicy]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     */
    protected notExistence: Map<PrimitiveMetadataAccessPolicy, MetadataNotExistencePolicy> = new Map();
    /**
     * @protected
     * @readonly
     * @property notExistence - map of metadata same target multi usage policy [[MetadataSameTargetMultiUsagePolicy]] by primitive metadata access policy [[PrimitiveMetadataAccessPolicy]]
     */
    protected sameTargetMultiUsage: Map<PrimitiveMetadataAccessPolicy, MetadataSameTargetMultiUsagePolicy> = new Map();

    /**
     * @public
     * @constructor
     * @param access - metadata access policy [[MetadataAccessPolicy]] default value - ALL
     */
    public constructor(access: MetadataAccessPolicy = MetadataAccessPolicy.ALL) {
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
     * @param value - value [[MetadataAppearancePolicy]] to apply to metadata appearance policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public setAppearancePolicy(value: MetadataAppearancePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        this.appearance.clear();
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * @public
     * @method to set collision policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataCollisionPolicy]] to apply to metadata collision policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public setCollisionPolicy(value: MetadataCollisionPolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        this.collision.clear();
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * @public
     * @method to set not existence policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataNotExistencePolicy]] to apply to metadata not existence policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public setNotExistencePolicy(value: MetadataNotExistencePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        this.notExistence.clear();
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * @public
     * @method to set same target multi usage policy based on access provided in constructor, old values will be deleted and new values set
     * @param value - value [[MetadataSameTargetMultiUsagePolicy]] to apply to metadata same target multi usage policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public setSameTargetMultiUsagePolicy(value: MetadataSameTargetMultiUsagePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        this.sameTargetMultiUsage.clear();
        return this.addPolicy(this.sameTargetMultiUsage, value, access);
    }

    /**
     * @public
     * @method to add appearance policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataAppearancePolicy]] to apply to metadata appearance policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public addAppearancePolicy(value: MetadataAppearancePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.appearance, value, access);
    }

    /**
     * @public
     * @method to add collision policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataCollisionPolicy]] to apply to metadata collision policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public addCollisionPolicy(value: MetadataCollisionPolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.collision, value, access);
    }

    /**
     * @public
     * @method to add not existence policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataNotExistencePolicy]] to apply to metadata not existence policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public addNotExistencePolicy(value: MetadataNotExistencePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.notExistence, value, access);
    }

    /**
     * @public
     * @method to add same target multi usage policy based on access provided in constructor, old values will be updated
     * @param value - value [[MetadataSameTargetMultiUsagePolicy]] to apply to metadata same target multi usage policy
     * @param access - metadata access policy [[MetadataAccessPolicy]], default value - ALL
     * @return current instance of policy provider
     */
    public addSameTargetMultiUsagePolicy(value: MetadataSameTargetMultiUsagePolicy, access: MetadataAccessPolicy = MetadataAccessPolicy.ALL): this {
        return this.addPolicy(this.sameTargetMultiUsage, value, access);
    }

    /**
     * @inheritDoc
     */
    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy): MetadataAppearancePolicy {
        return this.appearance.get(access) ?? MetadataAppearancePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy): MetadataCollisionPolicy {
        return this.collision.get(access) ?? MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy): MetadataNotExistencePolicy {
        return this.notExistence.get(access) ?? MetadataNotExistencePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy): MetadataSameTargetMultiUsagePolicy {
        return this.sameTargetMultiUsage.get(access) ?? MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }

    /**
     * @inheritDoc
     */
    public getAccessPolicy(): MetadataAccessPolicy {
        return this.access;
    }

    /**
     * @inheritDoc
     */
    public hasAccessPolicy(access: PrimitiveMetadataAccessPolicy): boolean {
        return (this.access & access) > 0;
    }

    /**
     * @protected
     * @method to add generic policy
     * @param map - map of metadata policy
     * @param value - value to apply to metadata policy
     * @param access - metadata access policy [[MetadataAccessPolicy]]
     * @return current instance of policy provider
     */
    protected addPolicy(map: Map<PrimitiveMetadataAccessPolicy, unknown>, value: unknown, access: MetadataAccessPolicy): this {
        let currentAccess: MetadataAccessPolicy = this.access & access;
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

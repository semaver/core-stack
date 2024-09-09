import {
    IPolicyProvider,
    MetadataAccessPolicy,
    MetadataAppearancePolicy,
    MetadataCollisionPolicy,
    MetadataNotExistencePolicy,
    MetadataSameTargetMultiUsagePolicy,
    PolicyProvider,
    PrimitiveMetadataAccessPolicy
} from "../src";

describe("Policy Provider tests", () => {

    it("test default access policies 1", () => {
        const policyProvider: IPolicyProvider = new PolicyProvider();

        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_PROPERTY)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_PROPERTY)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_ACCESSOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBeTruthy();
    });

    it("test default access policies 2", () => {
        const policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.ALL);

        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_PROPERTY)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_PROPERTY)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_ACCESSOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBeTruthy();
    });

    it("test default access policies 3", () => {
        const policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR);

        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_METHOD)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_METHOD)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_PROPERTY)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_PROPERTY)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_ACCESSOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBeFalsy();
    });

    it("test parameter access policies ", () => {
        const policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER);

        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_METHOD)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_METHOD)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_PROPERTY)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_PROPERTY)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.INSTANCE_ACCESSOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR)).toBeFalsy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBeTruthy();
        expect(policyProvider.hasAccessPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBeTruthy();

    });

    it("test set/get collision policies ", () => {
        const policyProvider: PolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER);

        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataCollisionPolicy.DEFAULT);

        policyProvider.addCollisionPolicy(MetadataCollisionPolicy.SKIP, MetadataAccessPolicy.ALL);

        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataCollisionPolicy.SKIP);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataCollisionPolicy.SKIP);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataCollisionPolicy.SKIP);

        policyProvider.addCollisionPolicy(MetadataCollisionPolicy.JOIN, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataCollisionPolicy.SKIP);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataCollisionPolicy.SKIP);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataCollisionPolicy.JOIN);

        policyProvider.setCollisionPolicy(MetadataCollisionPolicy.THROW_ERROR, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataCollisionPolicy.DEFAULT);
        expect(policyProvider.getCollisionPolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataCollisionPolicy.THROW_ERROR);
    });

    it("test set/get appearance policies ", () => {
        const policyProvider: PolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER);

        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataAppearancePolicy.DEFAULT);

        policyProvider.addAppearancePolicy(MetadataAppearancePolicy.SKIP, MetadataAccessPolicy.ALL);

        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataAppearancePolicy.SKIP);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataAppearancePolicy.SKIP);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataAppearancePolicy.SKIP);

        policyProvider.addAppearancePolicy(MetadataAppearancePolicy.APPLY, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataAppearancePolicy.SKIP);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataAppearancePolicy.SKIP);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataAppearancePolicy.APPLY);

        policyProvider.setAppearancePolicy(MetadataAppearancePolicy.SKIP, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataAppearancePolicy.DEFAULT);
        expect(policyProvider.getAppearancePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataAppearancePolicy.SKIP);
    });

    it("test set/get same target multi usage policies ", () => {
        const policyProvider: PolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER);

        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);

        policyProvider.addSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.ALLOWED, MetadataAccessPolicy.ALL);

        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);

        policyProvider.addSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED);

        policyProvider.setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.ALLOWED, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.DEFAULT);
        expect(policyProvider.getSameTargetMultiUsagePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataSameTargetMultiUsagePolicy.ALLOWED);
    });

    it("test set/get not existence policies ", () => {
        const policyProvider: PolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER);

        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataNotExistencePolicy.DEFAULT);

        policyProvider.addNotExistencePolicy(MetadataNotExistencePolicy.SKIP, MetadataAccessPolicy.ALL);

        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.SKIP);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataNotExistencePolicy.SKIP);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataNotExistencePolicy.SKIP);

        policyProvider.addNotExistencePolicy(MetadataNotExistencePolicy.APPLY, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.SKIP);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataNotExistencePolicy.SKIP);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataNotExistencePolicy.APPLY);

        policyProvider.setNotExistencePolicy(MetadataNotExistencePolicy.SKIP, MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD);

        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD)).toBe(MetadataNotExistencePolicy.DEFAULT);
        expect(policyProvider.getNotExistencePolicy(PrimitiveMetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD)).toBe(MetadataNotExistencePolicy.SKIP);
    });
});

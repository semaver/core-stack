import {
    Decorator,
    DecoratorFn,
    IPolicyProvider,
    MetadataAccessPolicy,
    MetadataAccessPolicyValues,
    MetadataAppearancePolicy,
    MetadataAppearancePolicyValues,
    MetadataCollisionPolicy,
    MetadataCollisionPolicyValues,
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues,
    MetadataSameTargetMultiUsagePolicy,
    MetadataSameTargetMultiUsagePolicyValues,
    PolicyProvider,
    PrimitiveMetadataAccessPolicyValues
} from "../../src";

export function annotationWithPolicyProvider(): DecoratorFn {
    return Decorator.build(new AnnotationWithPolicyProviderDecorator());
}

export class AnnotationWithPolicyProviderDecorator extends Decorator {

    private static policyProvider: IPolicyProvider =
        // Allow for methods and properties only
        new PolicyProvider(MetadataAccessPolicy.METHOD | MetadataAccessPolicy.PROPERTY)
            .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
            .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT)
            .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
            // Allow multiple decorators for instance methods and properties
            .setSameTargetMultiUsagePolicy(
                MetadataSameTargetMultiUsagePolicy.ALLOWED,
                MetadataAccessPolicy.INSTANCE_METHOD | MetadataAccessPolicy.INSTANCE_PROPERTY)
            // Do not allow multiple decorators for static methods and properties
            .setSameTargetMultiUsagePolicy(
                MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED,
                MetadataAccessPolicy.STATIC_METHOD | MetadataAccessPolicy.STATIC_PROPERTY);

    public getAccessPolicy(): MetadataAccessPolicyValues {
        return AnnotationWithPolicyProviderDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataAppearancePolicyValues {
        return AnnotationWithPolicyProviderDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataNotExistencePolicyValues {
        return AnnotationWithPolicyProviderDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataCollisionPolicyValues {
        return AnnotationWithPolicyProviderDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues): MetadataSameTargetMultiUsagePolicyValues {
        return AnnotationWithPolicyProviderDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

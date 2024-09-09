import {
    Decorator,
    DecoratorFn,
    MetadataAccessPolicy,
    MetadataAccessPolicyValues,
    MetadataCollisionPolicy,
    MetadataCollisionPolicyValues,
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues,
    MetadataSameTargetMultiUsagePolicy,
    MetadataSameTargetMultiUsagePolicyValues
} from "../../src";

export function annotationWithoutPolicyProvider(): DecoratorFn {
    return Decorator.build(new AnnotationWithoutPolicyProviderDecorator());
}

export class AnnotationWithoutPolicyProviderDecorator extends Decorator {

    // Allow only instance properties, accessors, and constructor parameters
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_PROPERTY |
            MetadataAccessPolicy.INSTANCE_ACCESSOR |
            MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR;
    }

    // Override parent class decorator if both exist on the same member
    public getCollisionPolicy(): MetadataCollisionPolicyValues {
        return MetadataCollisionPolicy.OVERRIDE_PARENT;
    }

    // Apply parent class decorator if none exists in the child class
    public getNotExistencePolicy(): MetadataNotExistencePolicyValues {
        return MetadataNotExistencePolicy.APPLY;
    }

    // Do not allow multiple decorators on the same class member or parameter
    public getSameTargetMultiUsagePolicy(): MetadataSameTargetMultiUsagePolicyValues {
        return MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED;
    }
}

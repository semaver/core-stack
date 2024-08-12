import {IFunction, IType} from "@semaver/core";
import {
    Decorator,
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
    PrimitiveMetadataAccessPolicy,
    PrimitiveMetadataAccessPolicyValues
} from "../../../src";

export function injectDemo<T>(type: IType<T>): IFunction<void> {
    return Decorator.build(new InjectDemoDecorator().setType(type));
}

export class InjectDemoDecorator<T> extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.INST_PROPERTY | MetadataAccessPolicy.INST_ACCESSOR | MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)
        .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
        .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT)
        .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
        .setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.DEFAULT);

    private type?: IType<T>;

    public setType(value: IType<T>): this {
        this.type = value;
        return this;
    }

    public getParameters(): readonly unknown[] {
        return [this.type];
    }

    public getAccessPolicy(): MetadataAccessPolicyValues {
        return InjectDemoDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        return InjectDemoDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        return InjectDemoDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        return InjectDemoDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        return InjectDemoDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

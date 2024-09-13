import {IFunction} from "@semaver/core";
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
    PrimitiveMetadataAccessPolicyValues,
} from "../../../src";

export function param(type: string, ...params: unknown[]): IFunction<void> {
    return Decorator.build(new ConstructorParameterDecorator().setType(type).setAnyParams(...params));
}

export class ConstructorParameterDecorator extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR)
        .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
        .setCollisionPolicy(MetadataCollisionPolicy.THROW_ERROR)
        .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
        .setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED);

    private type?: string;
    private args: unknown[] = [];

    public setType(value: string): this {
        this.type = value;
        return this;
    }

    public setAnyParams(...args: unknown[]): this {
        this.args = args;
        return this;
    }

    public getParameters(): readonly unknown[] {
        return [this.type, ...this.args];
    }

    public getAccessPolicy(): MetadataAccessPolicyValues {
        return ConstructorParameterDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        return ConstructorParameterDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        return ConstructorParameterDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        return ConstructorParameterDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        return ConstructorParameterDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

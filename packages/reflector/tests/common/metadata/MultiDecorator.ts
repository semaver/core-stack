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
    PrimitiveMetadataAccessPolicyValues
} from "../../../src";

export function multi(type: string, ...params: unknown[]): IFunction<void> {
    return Decorator.build(new MultiDecorator().setType(type).setAnyParams(...params));
}

export class MultiDecorator extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.ALL)
        .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
        .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT)
        .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
        .setSameTargetMultiUsagePolicy(MetadataSameTargetMultiUsagePolicy.ALLOWED);

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
        return MultiDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        return MultiDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        return MultiDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        return MultiDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        return MultiDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

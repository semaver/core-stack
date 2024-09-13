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

export function skipped(type: string, ...params: unknown[]): IFunction<void> {
    return Decorator.build(new SkippedDecorator().setType(type).setAnyParams(...params));
}

export class SkippedDecorator extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.ALL)
        .setAppearancePolicy(MetadataAppearancePolicy.SKIP)
        .setCollisionPolicy(MetadataCollisionPolicy.SKIP)
        .setNotExistencePolicy(MetadataNotExistencePolicy.SKIP)
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
        return SkippedDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        return SkippedDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        return SkippedDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        return SkippedDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        return SkippedDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

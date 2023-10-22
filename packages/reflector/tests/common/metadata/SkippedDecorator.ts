import {IFunction} from "@semaver/core";
import {
    Decorator,
    IPolicyProvider,
    MetadataAccessPolicy,
    MetadataAppearancePolicy,
    MetadataCollisionPolicy,
    MetadataNotExistencePolicy,
    MetadataSameTargetMultiUsagePolicy,
    PolicyProvider,
    PrimitiveMetadataAccessPolicy,
} from "../../../src";

export function skipped(type: string, ...params: any[]): IFunction<void> {
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

    public setAnyParams(...args: any[]): this {
        this.args = args;
        return this;
    }

    public getParameters(): ReadonlyArray<unknown> {
        return [this.type, ...this.args];
    }

    public getAccessPolicy(): MetadataAccessPolicy {
        return SkippedDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return SkippedDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return SkippedDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return SkippedDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return SkippedDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

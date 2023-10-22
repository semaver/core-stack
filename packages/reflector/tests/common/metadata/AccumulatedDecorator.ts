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
    PrimitiveMetadataAccessPolicy
} from "../../../src";

export function accumulated(type: string, ...params: any[]): IFunction<void> {
    return Decorator.build(new AccumulatedDecorator().setType(type).setAnyParams(...params));
}

export class AccumulatedDecorator extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.ALL)
        .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
        .setCollisionPolicy(MetadataCollisionPolicy.JOIN)
        .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
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
        return AccumulatedDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return AccumulatedDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return AccumulatedDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return AccumulatedDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return AccumulatedDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

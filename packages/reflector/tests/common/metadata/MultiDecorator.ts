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

export function multi(type: string, ...params: any[]): IFunction<void> {
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

    public setAnyParams(...args: any[]): this {
        this.args = args;
        return this;
    }

    public getParameters(): ReadonlyArray<unknown> {
        return [this.type, ...this.args];
    }

    public getAccessPolicy(): MetadataAccessPolicy {
        return MultiDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return MultiDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return MultiDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return MultiDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return MultiDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

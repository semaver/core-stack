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

export function unique(type: string, ...params: any[]): IFunction<void> {
    return Decorator.build(new UniqueDecorator().setType(type).setAnyParams(...params));
}

export class UniqueDecorator extends Decorator {

    private static policyProvider: IPolicyProvider = new PolicyProvider(MetadataAccessPolicy.ALL)
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

    public setAnyParams(...args: any[]): this {
        this.args = args;
        return this;
    }

    public getParameters(): ReadonlyArray<unknown> {
        return [this.type, ...this.args];
    }

    public getAccessPolicy(): MetadataAccessPolicy {
        return UniqueDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return UniqueDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return UniqueDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return UniqueDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return UniqueDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

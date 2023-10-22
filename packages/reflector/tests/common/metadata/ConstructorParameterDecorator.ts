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

export function param(type: string, ...params: any[]): IFunction<void> {
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

    public setAnyParams(...args: any[]): this {
        this.args = args;
        return this;
    }

    public getParameters(): ReadonlyArray<unknown> {
        return [this.type, ...this.args];
    }

    public getAccessPolicy(): MetadataAccessPolicy {
        return ConstructorParameterDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return ConstructorParameterDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return ConstructorParameterDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return ConstructorParameterDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return ConstructorParameterDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

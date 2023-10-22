import {IFunction, IType} from "@semaver/core";
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

    public getParameters(): ReadonlyArray<unknown> {
        return [this.type];
    }

    public getAccessPolicy(): MetadataAccessPolicy {
        return InjectDemoDecorator.policyProvider.getAccessPolicy();
    }

    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        return InjectDemoDecorator.policyProvider.getAppearancePolicy(access);
    }

    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        return InjectDemoDecorator.policyProvider.getNotExistencePolicy(access);
    }

    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        return InjectDemoDecorator.policyProvider.getCollisionPolicy(access);
    }

    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        return InjectDemoDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
    }
}

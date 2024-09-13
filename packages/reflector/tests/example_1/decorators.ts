import {IFunction, IType} from "@semaver/core";
import {Decorator, MetadataAccessPolicy, MetadataAccessPolicyValues} from "../../src";

// --------------------------------------------

export function inject(type: IType<object>): IFunction<void> {
    return Decorator.build(new InjectDecorator(type));
}

export class InjectDecorator extends Decorator {
    protected readonly _type: IType<object>;

    public constructor(type: IType<object>) {
        super();
        this._type = type;
    }

    public getType(): IType<object> {
        return this._type;
    }

    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_PROPERTY
            | MetadataAccessPolicy.INSTANCE_ACCESSOR
            | MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR;
    }

    public getParameters(): readonly unknown[] {
        return [this._type];
    }
}

// --------------------------------------------

export function optional(): IFunction<void> {
    return Decorator.build(new OptionalDecorator());
}

export class OptionalDecorator extends Decorator {
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_PROPERTY
            | MetadataAccessPolicy.INSTANCE_ACCESSOR
            | MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR;
    }
}

// --------------------------------------------

export type DependencyId = string | number | symbol;

export function named(name: DependencyId): IFunction<void> {
    return Decorator.build(new NamedDecorator(name));
}

export class NamedDecorator extends Decorator {
    protected readonly _name: DependencyId;

    public constructor(name: DependencyId) {
        super();
        this._name = name;
    }

    public getName(): DependencyId {
        return this._name;
    }

    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_PROPERTY
            | MetadataAccessPolicy.INSTANCE_ACCESSOR
            | MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR;
    }

    public getParameters(): readonly unknown[] {
        return [this._name];
    }
}

// --------------------------------------------

export function postConstruct(): IFunction<void> {
    return Decorator.build(new PostConstructDecorator());
}

export class PostConstructDecorator extends Decorator {
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_METHOD;
    }
}

// --------------------------------------------

export function preDestroy(): IFunction<void> {
    return Decorator.build(new PreDestroyDecorator());
}

export class PreDestroyDecorator extends Decorator {
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.INSTANCE_METHOD;
    }
}

import {Decorator, DecoratorFn} from "./Decorator";
import {MetadataAccessPolicy, MetadataAccessPolicyValues} from "../metatable/policies/MetadataAccessPolicy";
import {
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues
} from "../metatable/policies/MetadataNotExistencePolicy";

/**
 * decorator function to create/build metaclass decorator
 *
 * @public
 * @returns decorator function
 */
export function metaclass(): DecoratorFn {
    return Decorator.build(new MetaclassDecorator());
}

/**
 * class to create a class decorator to mark this class to be registered in global metatable,\
 * the target decorated class will be visible in class table without this decorator if it contains its other own decorators.
 *
 * @public
 */
export class MetaclassDecorator extends Decorator {

    /**
     * @inheritDoc
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.CONSTRUCTOR;
    }

    /**
     * @inheritDoc
     */
    public getNotExistencePolicy(): MetadataNotExistencePolicyValues {
        return MetadataNotExistencePolicy.SKIP;
    }
}

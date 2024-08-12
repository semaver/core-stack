import {Decorator, DecoratorFn} from "./Decorator";
import {MetadataAccessPolicy, MetadataAccessPolicyValues} from "../metatable/policies/MetadataAccessPolicy";
import {
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues
} from "../metatable/policies/MetadataNotExistencePolicy";

/**
 * @public
 * @function
 * @return decorator function [[DecoratorFn]]
 * @description - decorator function [[DecoratorFn]] to create/build metaclass decorator [[MetaclassDecorator]]
 */
export function metaclass(): DecoratorFn {
    return Decorator.build(new MetaclassDecorator());
}

/**
 * @public
 * @class
 * @extends [[Decorator]]
 * @description - class to create a class decorator to mark this class to be registered in global metatable,
 * the class will be visible in class table without this decorator if it contains other own decorators.
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

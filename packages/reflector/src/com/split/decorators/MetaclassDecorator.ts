import {Decorator, DecoratorFn} from "./Decorator";
import {MetadataAccessPolicy} from "../metatable/policies/MetadataAccessPolicy";
import {MetadataNotExistencePolicy} from "../metatable/policies/MetadataNotExistencePolicy";

/**
 * @global
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
    public getAccessPolicy(): MetadataAccessPolicy {
        return MetadataAccessPolicy.CONSTRUCTOR;
    }

    /**
     * @inheritDoc
     */
    public getNotExistencePolicy(): MetadataNotExistencePolicy {
        return MetadataNotExistencePolicy.SKIP;
    }
}

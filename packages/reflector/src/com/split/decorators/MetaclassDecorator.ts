import {Decorator, DecoratorFn} from "./Decorator";
import {MetadataAccessPolicy, MetadataAccessPolicyValues} from "../metatable/policies/MetadataAccessPolicy";
import {
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues
} from "../metatable/policies/MetadataNotExistencePolicy";

/**
 * factory that returns the `@metaclass` class decorator function; applying it to a class forces that class
 * to be registered in the global metatable/class table even when it declares no other decorators of its own.
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
     * method to get access policy of decorator; returns {@link MetadataAccessPolicy.CONSTRUCTOR}, restricting this
     * decorator to constructors only since it marks the class itself rather than any member.
     *
     * @returns CONSTRUCTOR access policy value
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.CONSTRUCTOR;
    }

    /**
     * method to get not existence policy for the metaclass marker; returns SKIP so the marker is not inherited by
     * subclasses — a subclass is registered in the class table only if it applies `@metaclass` (or another decorator) of its own.
     *
     * @returns {@link MetadataNotExistencePolicy.SKIP}
     */
    public getNotExistencePolicy(): MetadataNotExistencePolicyValues {
        return MetadataNotExistencePolicy.SKIP;
    }
}

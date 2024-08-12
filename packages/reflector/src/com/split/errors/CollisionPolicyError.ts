import {ExtendedError} from "@semaver/core";
import {MetadataTableProvider} from "../metatable/MetadataTableProvider";

/**
 * custom error for child class thrown if decorator collision policy === MetadataCollisionPolicy.THROW_ERROR and collision in action
 *
 * @public
 */
export class CollisionPolicyError extends ExtendedError {

    /**
     * @public
     * @param target - metadata table provider where error is thrown
     * @param childClassName - child class name
     * @param childDecoratorClassName - child decorator class name
     */
    public constructor(target: MetadataTableProvider, childClassName: string, childDecoratorClassName: string) {
        super(target, `Decorator collision by policy(MetadataCollisionPolicy.THROW_ERROR), decorator {class name: ${childClassName}, name: ${childDecoratorClassName}}`);
    }
}

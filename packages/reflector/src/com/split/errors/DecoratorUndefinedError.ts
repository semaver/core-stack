import {ExtendedError} from "@semaver/core";
import {DecoratedElement} from "../reflector/members/DecoratedElement";

/**
 * custom error for object thrown if decorator is undefined
 *
 * @public
 */
export class DecoratorUndefinedError extends ExtendedError {

    /**
     * @public
     * @param target - decorated element where error is thrown
     */
    public constructor(target: DecoratedElement) {
        super(target, `Decorator is null or undefined`);
    }
}

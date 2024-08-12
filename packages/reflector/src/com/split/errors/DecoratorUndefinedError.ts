import {ExtendedError} from "@semaver/core";
import {DecoratedElement} from "../reflector/members/DecoratedElement";

/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for object thrown if decorator is undefined
 */
export class DecoratorUndefinedError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - decorated element [[DecoratedElement]] where error is thrown
     */
    public constructor(target: DecoratedElement) {
        super(target, `Decorator is null or undefined`);
    }
}

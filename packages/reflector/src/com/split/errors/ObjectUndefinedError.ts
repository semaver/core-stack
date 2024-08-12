import {ExtendedError} from "@semaver/core";

/**
 * custom error for object thrown if object is undefined
 *
 * @public
 */
export class ObjectUndefinedError extends ExtendedError {

    /**
     * @public
     * @param target - object where error is thrown
     */
    public constructor(target: object) {
        super(target, `Object is null or undefined`);
    }
}

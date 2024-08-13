import {ExtendedError} from "@semaver/core";

/**
 * custom error for an object thrown if the object is undefined
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

import {ExtendedError} from "@semaver/core";

/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for object thrown if object is undefined
 */
export class ObjectUndefinedError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     */
    public constructor(target: object) {
        super(target, `Object is null or undefined`);
    }
}

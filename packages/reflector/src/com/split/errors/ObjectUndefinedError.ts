import {CoreError} from "@semaver/core";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for object thrown if object is undefined
 */
export class ObjectUndefinedError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     */
    public constructor(target: unknown) {
        super(target, `Object is null or undefined`);
    }
}

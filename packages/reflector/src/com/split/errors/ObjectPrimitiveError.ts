import {CoreError} from "@semaver/core";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for object thrown if object is primitive
 */
export class ObjectPrimitiveError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     * @param obj - obj to check
     */
    public constructor(target: unknown, obj: unknown) {
        super(target, `Object is primitive ${obj}`);
    }
}

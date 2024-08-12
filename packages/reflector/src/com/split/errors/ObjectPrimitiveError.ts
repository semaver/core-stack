import {ExtendedError} from "@semaver/core";

/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for object thrown if object is primitive
 */
export class ObjectPrimitiveError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     * @param obj - obj to check
     */
    public constructor(target: object, obj: unknown) {
        super(target, `Object is primitive ${String(obj)}`);
    }
}

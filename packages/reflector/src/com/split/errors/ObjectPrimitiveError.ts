import {ExtendedError} from "@semaver/core";

/**
 * custom error for an object thrown if the object is primitive
 *
 * @public
 */
export class ObjectPrimitiveError extends ExtendedError {

    /**
     * @public
     * @param target - object where error is thrown
     * @param obj - obj to check
     */
    public constructor(target: object, obj: unknown) {
        super(target, `Object is primitive ${String(obj)}`);
    }
}

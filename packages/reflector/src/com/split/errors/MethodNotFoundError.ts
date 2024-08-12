import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementType";
import {Method} from "../reflector/members/Method";

// TODO docs
/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for class member target thrown if method for current target not found
 */
export class MethodNotFoundError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - method class member [[Method]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementTypeValues]]
     * @param classMemberName - class member name
     */
    public constructor(target: Method, classMemberType: DecoratedElementTypeValues, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) Method not found`);
    }
}

import {CoreError} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";
import {Method} from "../reflector/members/Method";

// TODO docs
/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for class member target thrown if method for current target not found
 */
export class MethodNotFoundError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - method class member [[Method]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementType]]
     * @param classMemberName - class member name
     */
    public constructor(target: Method, classMemberType: DecoratedElementType, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) Method not found`);
    }
}

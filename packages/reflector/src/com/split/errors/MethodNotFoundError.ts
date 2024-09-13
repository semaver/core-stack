import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";
import {Method} from "../reflector/members/Method";

/**
 * custom error for class member target thrown if method for current target not found
 *
 * @public
 */
export class MethodNotFoundError extends ExtendedError {

    /**
     * @public
     * @param target - method class member where error is thrown
     * @param classMemberType - class member type
     * @param classMemberName - class member name
     */
    public constructor(target: Method, classMemberType: DecoratedElementTypeValues, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) Method not found`);
    }
}

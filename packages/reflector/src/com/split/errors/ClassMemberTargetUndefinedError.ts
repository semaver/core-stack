import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for class member target thrown if class member target is undefined
 */
export class ClassMemberTargetUndefinedError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementTypeValues]]
     * @param classMemberName - class member name
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}): target is null or undefined`);
    }
}

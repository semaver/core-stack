import {CoreError} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for class member target thrown if class member target is undefined
 */
export class ClassMemberTargetUndefinedError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementType]]
     * @param classMemberName - class member name
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementType, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}): target is null or undefined`);
    }
}

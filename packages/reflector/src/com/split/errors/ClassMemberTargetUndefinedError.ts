import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * custom error for class member target thrown if class member target is undefined
 *
 * @public
 */
export class ClassMemberTargetUndefinedError extends ExtendedError {

    /**
     * @public
     * @param target - class member where error is thrown
     * @param classMemberType - class member type
     * @param classMemberName - class member name
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string) {
        super(target, `${classMemberType.toString()} - (${classMemberName}): target is null or undefined`);
    }
}

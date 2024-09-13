import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * custom error for class member target thrown if class member does not exist in target
 *
 * @public
 */
export class ClassMemberNotExistenceError extends ExtendedError {

    /**
     * @public
     * @param target - class member where error is thrown
     * @param classMemberType - class member type
     * @param classMemberName - class member name
     * @param classMemberTarget - class member object (object containing class member)
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string, classMemberTarget: object) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) does not exist in target ${String(classMemberTarget)}`);
    }
}

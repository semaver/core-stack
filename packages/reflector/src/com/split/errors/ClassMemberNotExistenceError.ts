import {CoreError} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for class member target thrown if class member does not exist in target
 */
export class ClassMemberNotExistenceError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementType]]
     * @param classMemberName - class member name
     * @param classMemberTarget - class member object (object containing class member)
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementType, classMemberName: string, classMemberTarget: unknown) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) does not exist in target ${classMemberTarget}`);
    }
}

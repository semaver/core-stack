import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[ExtendedError]]
 * @description - custom error for class member target thrown if class member does not exist in target
 */
export class ClassMemberNotExistenceError extends ExtendedError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementTypeValues]]
     * @param classMemberName - class member name
     * @param classMemberTarget - class member object (object containing class member)
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string, classMemberTarget: object) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) does not exist in target ${String(classMemberTarget)}`);
    }
}

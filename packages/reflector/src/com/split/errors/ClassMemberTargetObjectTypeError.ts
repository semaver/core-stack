import {CoreError} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for class member target thrown if class member target is wrong object type (e.x. should be class but instance provided)
 */
export class ClassMemberTargetObjectTypeError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementType]]
     * @param classMemberName - class member name
     * @param classMemberTarget - class member object (object containing class member)
     * @param shouldBeClass - true if should be class or else instance
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementType, classMemberName: string, classMemberTarget: unknown, shouldBeClass: boolean) {
        const objectTypeString: string = shouldBeClass ? "class" : "instance";
        super(target, `${classMemberType.toString()} - (${classMemberName}): target ${classMemberTarget} should be ${objectTypeString}`);
    }
}

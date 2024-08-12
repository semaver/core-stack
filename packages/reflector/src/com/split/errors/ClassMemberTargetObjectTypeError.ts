import {ExtendedError} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * custom error for class member target thrown if class member target is wrong object type (e.x. should be class but instance provided)
 *
 * @public
 */
export class ClassMemberTargetObjectTypeError extends ExtendedError {

    /**
     * @public
     * @param target - class member where error is thrown
     * @param classMemberType - class member type
     * @param classMemberName - class member name
     * @param classMemberTarget - class member object (object containing class member)
     * @param shouldBeClass - true if it should be class or else instance
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string, classMemberTarget: object, shouldBeClass: boolean) {
        const objectTypeString: string = shouldBeClass ? "class" : "instance";
        super(target, `${classMemberType.toString()} - (${classMemberName}): target ${String(classMemberTarget)} should be ${objectTypeString}`);
    }
}

import {ExtendedError} from "@semaver/core";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * custom error for an object thrown if class member of this object not found
 *
 * @public
 */
export class ClassMemberNotFoundError extends ExtendedError {

    /**
     * @public
     * @param target - class member where error is thrown
     * @param classMemberName - class member name
     */
    public constructor(target: ClassMember, classMemberName: string) {
        super(target, `Runtime decoration: Class member with name (${classMemberName}) not found`);
    }
}

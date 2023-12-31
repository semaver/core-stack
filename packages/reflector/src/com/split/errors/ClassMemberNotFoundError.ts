import {CoreError} from "@semaver/core";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for object thrown if class member of this object not found
 */
export class ClassMemberNotFoundError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberName - class member name
     */
    public constructor(target: ClassMember, classMemberName: string) {
        super(target, `Runtime decoration: Class member with name (${classMemberName}) not found`);
    }
}

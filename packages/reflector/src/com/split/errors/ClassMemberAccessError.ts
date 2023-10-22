import {CoreError} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";
import {ClassMember} from "../reflector/members/ClassMember";

/**
 * @public
 * @enum
 * @description access type used for fields [[Field]]
 */
export enum AccessType {
    READ = "read",
    WRITE = "write",
    EXECUTE = "execute",
}

/**
 * @public
 * @class
 * @extends [[CoreError]]
 * @description - custom error for class member target thrown if class member does not have right access (read, write, execute)
 */
export class ClassMemberAccessError extends CoreError {

    /**
     * @public
     * @constructor
     * @param target - class member [[ClassMember]] where error is thrown
     * @param classMemberType - class member type [[DecoratedElementType]]
     * @param classMemberName - class member name
     * @param wrongAccessType - wrong class member access type [[AccessType]]
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementType, classMemberName: string, wrongAccessType: AccessType) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) Class member has no ${wrongAccessType} access`);
    }
}

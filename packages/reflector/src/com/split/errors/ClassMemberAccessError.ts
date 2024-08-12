import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";
import {ClassMember} from "../reflector/members/ClassMember";
import {ExtendedError} from "@semaver/core";

/**
 * access type used for fields
 *
 * @public
 * @enum
 */
export enum AccessType {
    READ = "read",
    WRITE = "write",
    EXECUTE = "execute",
}

/**
 * custom error for class member target thrown if class member does not have right access (read, write, execute)
 *
 * @public
 */
export class ClassMemberAccessError extends ExtendedError {

    /**
     * @public
     * @param target - class member where error is thrown
     * @param classMemberType - class member type
     * @param classMemberName - class member name
     * @param wrongAccessType - wrong class member access type
     */
    public constructor(target: ClassMember, classMemberType: DecoratedElementTypeValues, classMemberName: string, wrongAccessType: AccessType) {
        super(target, `${classMemberType.toString()} - (${classMemberName}) Class member has no ${wrongAccessType} access`);
    }
}

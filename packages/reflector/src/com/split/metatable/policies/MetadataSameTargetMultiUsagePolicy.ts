/**
 * @public
 * @enum
 * @description - same target multi usage policy:
 * if class member has more than one decorator of the same type.
 *
 *  - ALLOWED - all decorators are registered in metatable
 *  - NOT_ALLOWED - only first decorator is registered  in metatable
 *  - DEFAULT - NOT_ALLOWED definition used
 */
export enum MetadataSameTargetMultiUsagePolicy {
    ALLOWED,
    NOT_ALLOWED,
    DEFAULT = NOT_ALLOWED,
}

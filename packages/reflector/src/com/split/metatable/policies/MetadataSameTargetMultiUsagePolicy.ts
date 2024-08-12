export interface MetadataSameTargetMultiUsagePolicyType {
    ALLOWED: number;
    NOT_ALLOWED: number;
    DEFAULT: number
}

export type MetadataSameTargetMultiUsagePolicyValues = MetadataSameTargetMultiUsagePolicyType[keyof MetadataSameTargetMultiUsagePolicyType];

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
export const MetadataSameTargetMultiUsagePolicy: Readonly<MetadataSameTargetMultiUsagePolicyType> = Object.freeze({
    ALLOWED: 0,
    NOT_ALLOWED: 1,
    DEFAULT: 1,
});

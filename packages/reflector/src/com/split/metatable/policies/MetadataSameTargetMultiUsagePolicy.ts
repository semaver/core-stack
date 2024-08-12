/**
 * same target multi usage policy:
 * if class member has more than one decorator of the same type.
 *
 *  - ALLOWED - all decorators are registered in metatable
 *  - NOT_ALLOWED - only first decorator is registered  in metatable
 *  - DEFAULT - NOT_ALLOWED definition used
 *
 * @public
 * @enum
 */
export interface MetadataSameTargetMultiUsagePolicyType {
    ALLOWED: number;
    NOT_ALLOWED: number;
    DEFAULT: number
}

/**
 * implementation of {@link MetadataSameTargetMultiUsagePolicyType} enum values as type
 *
 * @public
 * @interface
 */
export type MetadataSameTargetMultiUsagePolicyValues = MetadataSameTargetMultiUsagePolicyType[keyof MetadataSameTargetMultiUsagePolicyType];

/**
 * implementation of {@link MetadataSameTargetMultiUsagePolicyType} interface
 * - ALLOWED: 0,
 * - NOT_ALLOWED: 1,
 * - DEFAULT: 1,
 *
 * @public
 * @enum
 */
export const MetadataSameTargetMultiUsagePolicy: Readonly<MetadataSameTargetMultiUsagePolicyType> = Object.freeze({
    ALLOWED: 0,
    NOT_ALLOWED: 1,
    DEFAULT: 1,
});

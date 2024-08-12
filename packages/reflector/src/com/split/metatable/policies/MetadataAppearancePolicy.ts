/**
 * appearance policy:
 * if class member in child class has decorator and class member in super class has no decorator <b>(own or inherited)</b>
 *
 *  - SKIP - decorator from child class is not used if there is already a decorator of the same type in any of superclasses except "closest" superclass (this is collision case)
 *  - APPLY - decorator from child class is used
 *  - DEFAULT - APPLY definition used
 *
 * @public
 * @interface
 */
export interface MetadataAppearancePolicyType {
    APPLY: number;
    SKIP: number;
    DEFAULT: number
}

/**
 * implementation of {@link MetadataAppearancePolicyType} enum values as type
 *
 * @public
 * @interface
 */
export type MetadataAppearancePolicyValues = MetadataAppearancePolicyType[keyof MetadataAppearancePolicyType];


/**
 * implementation of {@link MetadataAppearancePolicyType} interface
 * - SKIP: 0,
 * - APPLY: 1,
 * - DEFAULT: 1,
 *
 * @public
 * @enum
 */
export const MetadataAppearancePolicy: Readonly<MetadataAppearancePolicyType> = Object.freeze({
    SKIP: 0,
    APPLY: 1,
    DEFAULT: 1,
});

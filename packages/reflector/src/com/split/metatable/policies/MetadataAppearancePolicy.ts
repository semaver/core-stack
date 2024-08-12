export interface MetadataAppearancePolicyType {
    APPLY: number;
    SKIP: number;
    DEFAULT: number
}

export type MetadataAppearancePolicyValues = MetadataAppearancePolicyType[keyof MetadataAppearancePolicyType];

/**
 * @public
 * @enum
 * @description - appearance policy:
 * if class member in child class has decorator and class member in super class has no decorator.
 *
 *  - SKIP - decorator from child class is not used if there is already a decorator of the same type in any of super classes except "closest" super class (this is collision case)
 *  - APPLY - decorator from child class is used
 *  - DEFAULT - APPLY definition used
 */
export const MetadataAppearancePolicy: Readonly<MetadataAppearancePolicyType> = Object.freeze({
    SKIP: 0,
    APPLY: 1,
    DEFAULT: 1,
});

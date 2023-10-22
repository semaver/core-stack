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
export enum MetadataAppearancePolicy {
    SKIP,
    APPLY,
    DEFAULT = APPLY,
}

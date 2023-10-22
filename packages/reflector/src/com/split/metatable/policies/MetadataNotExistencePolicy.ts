/**
 * @public
 * @enum
 * @description - not existence policy:
 * if class member in child class has no decorator and class member in super class has a decorator/s of the same type.
 *
 *  - SKIP - decorator from super class is **not** used for child class
 *  - APPLY - decorator from super class is used for child class
 *  - DEFAULT - APPLY definition used
 */
export enum MetadataNotExistencePolicy {
    SKIP,
    APPLY,
    DEFAULT = APPLY,
}

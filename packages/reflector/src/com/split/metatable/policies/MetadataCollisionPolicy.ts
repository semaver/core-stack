/**
 * @public
 * @enum
 * @description - collision policy:
 * if class member in super class and in child class have decorator of the same type.
 *
 *  - SKIP - decorator from super class and child class are not used for child class
 *  - OVERRIDE_CHILD - decorator from super class is used in child class
 *  - OVERRIDE_PARENT- decorator from child class is used for child class
 *  - JOIN - decorator from super class and child class are used for child class
 *  - THROW_ERROR - if the collision happens, error will be thrown
 *  - DEFAULT - OVERRIDE_PARENT definition used
 */
export enum MetadataCollisionPolicy {
    SKIP,
    OVERRIDE_CHILD,
    OVERRIDE_PARENT,
    JOIN,
    THROW_ERROR,
    DEFAULT = OVERRIDE_PARENT,
}

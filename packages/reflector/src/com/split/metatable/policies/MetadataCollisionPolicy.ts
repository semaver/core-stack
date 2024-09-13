/**
 * collision policy:
 * if class member in superclass and in child class have decorator of the same type (superclass decorator - <b>own or inherited</b>).
 *
 *  - SKIP - decorator from super class and child class are not used for child class
 *  - OVERRIDE_CHILD - decorator from super class is used in child class
 *  - OVERRIDE_PARENT- decorator from child class is used for child class
 *  - JOIN - decorator from super class and child class are used for child class
 *  - THROW_ERROR - if the collision happens, error will be thrown
 *  - DEFAULT - OVERRIDE_PARENT definition used
 *
 * @public
 * @enum
 */
export interface MetadataCollisionPolicyType {
    OVERRIDE_PARENT: number;
    OVERRIDE_CHILD: number;
    THROW_ERROR: number;
    JOIN: number;
    SKIP: number;
    DEFAULT: number
}

/**
 * implementation of {@link MetadataCollisionPolicyType} enum values as a type
 *
 * @public
 * @interface
 */
export type MetadataCollisionPolicyValues = MetadataCollisionPolicyType[keyof MetadataCollisionPolicyType];

/**
 * implementation of {@link MetadataCollisionPolicyType} interface
 * - SKIP: 0,
 * - OVERRIDE_CHILD: 1,
 * - OVERRIDE_PARENT: 2,
 * - JOIN: 3,
 * - THROW_ERROR: 4,
 * - DEFAULT: 2,
 *
 * @public
 * @enum
 */
export const MetadataCollisionPolicy: Readonly<MetadataCollisionPolicyType> = Object.freeze({
    SKIP: 0,
    OVERRIDE_CHILD: 1,
    OVERRIDE_PARENT: 2,
    JOIN: 3,
    THROW_ERROR: 4,
    DEFAULT: 2,
});

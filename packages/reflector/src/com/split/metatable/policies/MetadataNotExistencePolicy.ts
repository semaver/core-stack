/**
 * not existence policy:
 * if class member in child class has no decorator and class member in super class has a decorator/s of the same type <b>(own or inherited)</b>.
 *
 *  - SKIP - decorator from super class is **not** used for child class
 *  - APPLY - decorator from super class is used for child class
 *  - DEFAULT - APPLY definition used
 *
 * @public
 * @enum
 */
export interface MetadataNotExistencePolicyType {
    APPLY: number;
    SKIP: number;
    DEFAULT: number
}

/**
 * implementation of {@link MetadataNotExistencePolicyType} enum values as type
 *
 * @public
 * @interface
 */
export type MetadataNotExistencePolicyValues = MetadataNotExistencePolicyType[keyof MetadataNotExistencePolicyType];


/**
 * implementation of {@link MetadataNotExistencePolicyType} interface
 * - SKIP: 0,
 * - APPLY: 1,
 * - DEFAULT: 1,
 *
 * @public
 * @enum
 */
export const MetadataNotExistencePolicy: Readonly<MetadataNotExistencePolicyType> = Object.freeze({
    SKIP: 0,
    APPLY: 1,
    DEFAULT: 1,
});

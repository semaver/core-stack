/**
 * enum represent basic(primitive) decorated element types
 *
 * @private
 * @enum
 */
interface PrimitiveDecoratedElementType {
    CONSTRUCTOR: number
    PROPERTY: number;
    ACCESSOR: number;
    METHOD: number;
    CONSTRUCTOR_PARAMETER: number;
    METHODS_PARAMETER: number;
}

/**
 * enum represent decorated element types
 *
 * @public
 * @enum
 */
export interface DecoratedElementType extends PrimitiveDecoratedElementType {
    CLASS_MEMBER: number;
    DECORATED_ELEMENT: number;
    EXECUTABLE_ELEMENT: number;
    FIELD: number;
    PARAMETER: number;
}

/**
 * implementation of {@link DecoratedElementType} enum values as type
 *
 * @public
 * @interface
 */
export type DecoratedElementTypeValues = DecoratedElementType[keyof DecoratedElementType];

/**
 * implementation of {@link PrimitiveDecoratedElementEnum} interface
 * - CONSTRUCTOR: 1,
 * - PROPERTY: 2,
 * - ACCESSOR: 4,
 * - METHOD: 8,
 * - CONSTRUCTOR_PARAMETER: 16,
 * - METHODS_PARAMETER: 32,
 *
 * @private
 * @enum
 */
const PrimitiveDecoratedElementEnum: Readonly<PrimitiveDecoratedElementType> = Object.freeze({
    CONSTRUCTOR: 1,
    PROPERTY: 2,
    ACCESSOR: 4,
    METHOD: 8,
    CONSTRUCTOR_PARAMETER: 16,
    METHODS_PARAMETER: 32,
});

/**
 * implementation of {@link DecoratedElementType} interface
 * - CONSTRUCTOR: 1,
 * - PROPERTY: 2,
 * - ACCESSOR: 4,
 * - METHOD: 8,
 * - CONSTRUCTOR_PARAMETER: 16,
 * - METHODS_PARAMETER: 32,
 * - EXECUTABLE_ELEMENT: 9,
 * - FIELD: 6,
 * - CLASS_MEMBER: 15,
 * - PARAMETER: 48,
 * - DECORATED_ELEMENT: 63,
 *
 * @private
 * @enum
 */
export const DecoratedElementEnum: Readonly<DecoratedElementType> = Object.freeze({
    CONSTRUCTOR: PrimitiveDecoratedElementEnum.CONSTRUCTOR,
    METHOD: PrimitiveDecoratedElementEnum.METHOD,
    EXECUTABLE_ELEMENT: PrimitiveDecoratedElementEnum.METHOD | PrimitiveDecoratedElementEnum.CONSTRUCTOR,

    PROPERTY: PrimitiveDecoratedElementEnum.PROPERTY,
    ACCESSOR: PrimitiveDecoratedElementEnum.ACCESSOR,
    FIELD: PrimitiveDecoratedElementEnum.PROPERTY | PrimitiveDecoratedElementEnum.ACCESSOR,

    CLASS_MEMBER: PrimitiveDecoratedElementEnum.PROPERTY | PrimitiveDecoratedElementEnum.ACCESSOR |
        PrimitiveDecoratedElementEnum.METHOD | PrimitiveDecoratedElementEnum.CONSTRUCTOR,

    CONSTRUCTOR_PARAMETER: PrimitiveDecoratedElementEnum.CONSTRUCTOR_PARAMETER,
    METHODS_PARAMETER: PrimitiveDecoratedElementEnum.METHODS_PARAMETER,
    PARAMETER: PrimitiveDecoratedElementEnum.CONSTRUCTOR_PARAMETER | PrimitiveDecoratedElementEnum.METHODS_PARAMETER,

    DECORATED_ELEMENT: PrimitiveDecoratedElementEnum.PROPERTY | PrimitiveDecoratedElementEnum.ACCESSOR |
        PrimitiveDecoratedElementEnum.METHOD | PrimitiveDecoratedElementEnum.CONSTRUCTOR |
        PrimitiveDecoratedElementEnum.CONSTRUCTOR_PARAMETER | PrimitiveDecoratedElementEnum.METHODS_PARAMETER,
});





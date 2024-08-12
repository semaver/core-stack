interface PrimitiveDecoratedElementTypeType {
    CONSTRUCTOR: number
    PROPERTY: number;
    ACCESSOR: number;
    METHOD: number;
    CONSTRUCTOR_PARAMETER: number;
    METHODS_PARAMETER: number;
}

export interface DecoratedElementTypeType extends PrimitiveDecoratedElementTypeType {
    CLASS_MEMBER: number;
    DECORATED_ELEMENT: number;
    EXECUTABLE_ELEMENT: number;
    FIELD: number;
    PARAMETER: number;
}


export type DecoratedElementTypeValues = DecoratedElementTypeType[keyof DecoratedElementTypeType];

const PrimitiveDecoratedElementType: Readonly<PrimitiveDecoratedElementTypeType> = Object.freeze({
    CONSTRUCTOR: 1,
    PROPERTY: 2,
    ACCESSOR: 4,
    METHOD: 8,
    CONSTRUCTOR_PARAMETER: 16,
    METHODS_PARAMETER: 32,
});

/**
 * @public
 * @enum
 * @description - enum represent decorated element types
 */
export const DecoratedElementType: Readonly<DecoratedElementTypeType> = Object.freeze({
    CONSTRUCTOR: PrimitiveDecoratedElementType.CONSTRUCTOR,
    METHOD: PrimitiveDecoratedElementType.METHOD,
    EXECUTABLE_ELEMENT: PrimitiveDecoratedElementType.METHOD | PrimitiveDecoratedElementType.CONSTRUCTOR,

    PROPERTY: PrimitiveDecoratedElementType.PROPERTY,
    ACCESSOR: PrimitiveDecoratedElementType.ACCESSOR,
    FIELD: PrimitiveDecoratedElementType.PROPERTY | PrimitiveDecoratedElementType.ACCESSOR,

    CLASS_MEMBER: PrimitiveDecoratedElementType.PROPERTY | PrimitiveDecoratedElementType.ACCESSOR |
        PrimitiveDecoratedElementType.METHOD | PrimitiveDecoratedElementType.CONSTRUCTOR,

    CONSTRUCTOR_PARAMETER: PrimitiveDecoratedElementType.CONSTRUCTOR_PARAMETER,
    METHODS_PARAMETER: PrimitiveDecoratedElementType.METHODS_PARAMETER,
    PARAMETER: PrimitiveDecoratedElementType.CONSTRUCTOR_PARAMETER | PrimitiveDecoratedElementType.METHODS_PARAMETER,

    DECORATED_ELEMENT: PrimitiveDecoratedElementType.PROPERTY | PrimitiveDecoratedElementType.ACCESSOR |
        PrimitiveDecoratedElementType.METHOD | PrimitiveDecoratedElementType.CONSTRUCTOR |
        PrimitiveDecoratedElementType.CONSTRUCTOR_PARAMETER | PrimitiveDecoratedElementType.METHODS_PARAMETER,
});





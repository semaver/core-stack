export interface PrimitiveMetadataAccessPolicyType {
    NONE: number;
    CONSTRUCTOR: number
    INST_PROPERTY: number;
    INST_ACCESSOR: number;
    INST_METHOD: number;
    STATIC_PROPERTY: number;
    STATIC_ACCESSOR: number;
    STATIC_METHOD: number;
    PARAMETER_IN_CONSTRUCTOR: number;
    PARAMETER_IN_INST_METHOD: number;
    PARAMETER_IN_STATIC_METHOD: number;
}

export interface MetadataAccessPolicyType extends PrimitiveMetadataAccessPolicyType {
    ALL: number;
    PROPERTY: number;
    ACCESSOR: number;
    METHOD: number;
    PARAMETER: number
}

export type PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicyType[keyof PrimitiveMetadataAccessPolicyType];

export type MetadataAccessPolicyValues = MetadataAccessPolicyType[keyof MetadataAccessPolicyType];


export const PrimitiveMetadataAccessPolicy: Readonly<PrimitiveMetadataAccessPolicyType> = Object.freeze({
    NONE: 0,

    CONSTRUCTOR: 1,

    INST_PROPERTY: 2,
    STATIC_PROPERTY: 4,

    INST_ACCESSOR: 8,
    STATIC_ACCESSOR: 16,

    INST_METHOD: 32,
    STATIC_METHOD: 64,

    PARAMETER_IN_CONSTRUCTOR: 128,
    PARAMETER_IN_INST_METHOD: 256,
    PARAMETER_IN_STATIC_METHOD: 512,
});

/**
 * @public
 * @enum
 * @description - access policy used to define if the decorator can be applied on specific member or member group,
 * if the member does not satisfy condition, decorator is not applied to the member and metadata is not registered in metatable
 * - CONSTRUCTOR - the decorated will be proceeded if it is defined for constructor
 * - INST_PROPERTY - the decorated will be proceeded if it is defined for instance property
 * - STATIC_PROPERTY - the decorated will be proceeded if it is defined for static property
 * - PROPERTY - the decorated will be proceeded if it is defined for instance or static property
 * - INST_ACCESSOR - the decorated will be proceeded if it is defined for instance accessor
 * - STATIC_ACCESSOR - the decorated will be proceeded if it is defined for static accessor
 * - ACCESSOR - the decorated will be proceeded if it is defined for instance or static accessor
 * - INST_METHOD - the decorated will be proceeded if it is defined for instance method
 * - STATIC_METHOD - the decorated will be proceeded if it is defined for static method
 * - METHOD - the decorated will be proceeded if it is defined for instance or static method
 * - PARAMETER_IN_CONSTRUCTOR - the decorated will be proceeded if it is defined for parameter in constructor
 * - PARAMETER_IN_INST_METHOD - the decorated will be proceeded if it is defined for parameter in instance method
 * - PARAMETER_IN_STATIC_METHOD - the decorated will be proceeded if it is defined for parameter in static method
 * - PARAMETER_IN_METHOD - the decorated will be proceeded if it is defined for parameter in instance or static method
 * - PARAMETER - the decorated will be proceeded if it is defined for parameter in instance or static method or in constructor
 * - ALL - the decorated will be proceeded for all class members
 */
export const MetadataAccessPolicy: Readonly<MetadataAccessPolicyType> = Object.freeze({
    NONE: PrimitiveMetadataAccessPolicy.NONE,

    CONSTRUCTOR: PrimitiveMetadataAccessPolicy.CONSTRUCTOR,

    INST_PROPERTY: PrimitiveMetadataAccessPolicy.INST_PROPERTY,
    STATIC_PROPERTY: PrimitiveMetadataAccessPolicy.STATIC_PROPERTY,
    PROPERTY: PrimitiveMetadataAccessPolicy.INST_PROPERTY | PrimitiveMetadataAccessPolicy.STATIC_PROPERTY,

    INST_ACCESSOR: PrimitiveMetadataAccessPolicy.INST_ACCESSOR,
    STATIC_ACCESSOR: PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR,
    ACCESSOR: PrimitiveMetadataAccessPolicy.INST_ACCESSOR | PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR,

    INST_METHOD: PrimitiveMetadataAccessPolicy.INST_METHOD,
    STATIC_METHOD: PrimitiveMetadataAccessPolicy.STATIC_METHOD,
    METHOD: PrimitiveMetadataAccessPolicy.INST_METHOD | PrimitiveMetadataAccessPolicy.STATIC_METHOD,

    PARAMETER_IN_CONSTRUCTOR: PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR,
    PARAMETER_IN_INST_METHOD: PrimitiveMetadataAccessPolicy.PARAMETER_IN_INST_METHOD,
    PARAMETER_IN_STATIC_METHOD: PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD,
    PARAMETER_IN_METHOD: PrimitiveMetadataAccessPolicy.PARAMETER_IN_INST_METHOD | PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD,
    PARAMETER: PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR |
        PrimitiveMetadataAccessPolicy.PARAMETER_IN_INST_METHOD | PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD,

    ALL: PrimitiveMetadataAccessPolicy.CONSTRUCTOR |
        PrimitiveMetadataAccessPolicy.INST_PROPERTY | PrimitiveMetadataAccessPolicy.STATIC_PROPERTY |
        PrimitiveMetadataAccessPolicy.INST_ACCESSOR | PrimitiveMetadataAccessPolicy.STATIC_ACCESSOR |
        PrimitiveMetadataAccessPolicy.INST_METHOD | PrimitiveMetadataAccessPolicy.STATIC_METHOD |
        PrimitiveMetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR | PrimitiveMetadataAccessPolicy.PARAMETER_IN_INST_METHOD | PrimitiveMetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD,
});

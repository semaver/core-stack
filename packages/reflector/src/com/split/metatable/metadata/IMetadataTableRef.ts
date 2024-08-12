import {IMetatableDecorator} from "../../decorators/Decorator";

/**
 * a part of metadata table that contains information about static and instance class members by name
 *
 * @public
 * @interface
 */
export interface IStructureMetadataTableRef {
    /**
     * @public
     * @property _static - contains information about static members by name
     */
    _static: Map<string, IMemberMetadataTableRef>;

    /**
     * @public
     * @property _instance - contains information about instance members by name
     */
    _instance: Map<string, IMemberMetadataTableRef>;
}

/**
 * a part of metadata table that contains information about decorators and parameters if provided for current class member
 *
 * @public
 * @interface
 */
export interface IMemberMetadataTableRef {
    /**
     * @public
     * @property _decorators - contains information about decorators of class member
     */
    _decorators: IMetatableDecorator[];

    /**
     * @public
     * @property _parameters - contains information about decorators of class member parameters by index(position)
     */
    _parameters: IMetatableDecorator[][];
}

/**
 * metatable reference that contains information about all class members
 * @public
 * @interface
 */
export interface IMetadataTableRef {
    /**
     * @public
     * @property _constructors - contains metadata information about constructors
     */
    _constructors: IStructureMetadataTableRef;

    /**
     * @public
     * @property _methods - contains metadata information about methods
     */
    _methods: IStructureMetadataTableRef;

    /**
     * @public
     * @property _accessors - contains metadata information about accessors
     */
    _accessors: IStructureMetadataTableRef;

    /**
     * @public
     * @property _properties -  contains metadata information about properties
     */
    _properties: IStructureMetadataTableRef;
}

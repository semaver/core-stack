/**
 * @public
 * @interface
 * @description - class member metadata that contains information about current decoration
 */
import {DecoratedElementType} from "../types/DecoratedElementType";
import {IMetadataClass} from "../classes/IMetadataClass";
import {MetadataAccessPolicy} from "../policies/MetadataAccessPolicy";

export interface IMemberMetadata<T = unknown> {
    /**
     * @public
     * @property type - type of decorated element [[DecoratedElementType]]
     */
    type: DecoratedElementType;

    /**
     * @public
     * @property name - name of class member, in case of parameter - name of the method or class name for constructor
     */
    name: string;

    /**
     * @public
     * @property owner - class - owner of class member
     */
    owner: IMetadataClass<T>;

    /**
     * @public
     * @property isStatic - flag that indicates if class member is static
     */
    isStatic: boolean;

    /**
     * @public
     * @property access - metadata access policy
     */
    access: MetadataAccessPolicy;

    /**
     * @public
     * @property index - index(position) of current parameters
     */
    parameterIndex: number;
}

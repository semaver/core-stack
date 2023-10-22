import {CoreReflect, Nullable} from "@semaver/core";
import {IMetatableDecorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../../metatable/metadata/IMemberMetadata";
import {IMemberMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementType} from "../../metatable/types/DecoratedElementType";
import {DecoratedElement} from "./DecoratedElement";

/**
 * @public
 * @abstract
 * @class
 * @extends [[DecoratedElement]]
 * @description - class that implements core functionality for class members
 */
export abstract class ClassMember<T extends object = object> extends DecoratedElement<T> {

    /**
     * @protected
     * @readonly
     * @property _name - class member name
     */
    protected readonly _name: string;

    /**
     * @protected
     * @readonly
     * @property _isStatic - flag that indicates if class member is static
     */
    protected readonly _isStatic: boolean;

    /**
     * @protected
     * @constructor
     * @param metadataClass - class that contains current class member
     * @param name -  class member name
     * @param isStatic  - flag that indicates if class member is static
     */
    protected constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        isStatic: boolean) {

        super(metadataClass);

        this._name = name;
        this._isStatic = isStatic;
    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementType {
        return DecoratedElementType.CLASS_MEMBER;
    }

    /**
     * @inheritDoc
     */
    public getName(): string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public isStatic(): boolean {
        return this._isStatic;
    }

    /**
     * @public
     * @method to get if current class member is own or inherited
     * @return true if own class member
     */
    public isOwn(): boolean {
        const target: T = this.getObject();
        return CoreReflect.hasOwn(target, this._name);
    }

    /**
     * @inheritDoc
     */
    protected isDecoratorOf(target: IMetadataClass<unknown>, decorator: IMetatableDecorator): boolean {
        const metadata: IMemberMetadata = decorator.__metadata__;
        return metadata.type === this.getType()
            && metadata.name === this._name
            && metadata.isStatic === this._isStatic
            && metadata.owner === target;
    }

    /**
     * @inheritDoc
     */
    protected getMemberDecorators(memberMetadataTable: Nullable<IMemberMetadataTableRef>): IMetatableDecorator[] {
        return memberMetadataTable?._decorators || [];
    }
}

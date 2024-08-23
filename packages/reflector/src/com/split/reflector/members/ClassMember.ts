import {hasOwnProperty, Empty} from "@semaver/core";
import {IMetatableDecorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../../metatable/metadata/IMemberMetadata";
import {IMemberMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {DecoratedElement} from "./DecoratedElement";

/**
 * class that implements core functionality for class members
 *
 * @public
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
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.CLASS_MEMBER;
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
     * method to get if current class member its own or inherited
     *
     * @public
     * @returns true if own class member
     */
    public isOwn(): boolean {
        const target: object = this.getObject();
        return hasOwnProperty(target, this._name);
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
    protected getMemberDecorators(memberMetadataTable: Empty<IMemberMetadataTableRef>): IMetatableDecorator[] {
        return memberMetadataTable?._decorators ?? [];
    }
}

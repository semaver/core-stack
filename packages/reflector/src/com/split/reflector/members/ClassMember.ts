import {hasOwnProperty, Empty} from "@semaver/core";
import {IMetatableDecorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../../metatable/metadata/IMemberMetadata";
import {IMemberMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {DecoratedElement} from "./DecoratedElement";

/**
 * abstract base class for a named class member (constructor, method, property or accessor); adds a name and static/instance flag on top of {@link DecoratedElement}, resolves member-level decorator metadata, and reports whether the member is own or inherited
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
     * method to check whether this member is declared directly on the target rather than inherited from a superclass, via an own-property lookup on the class (for static members) or its prototype (for instance members)
     *
     * @public
     * @returns true if the member is declared on the target itself, false if inherited
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

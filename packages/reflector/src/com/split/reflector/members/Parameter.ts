import {Empty} from "@semaver/core";
import {IMetatableDecorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../../metatable/metadata/IMemberMetadata";
import {IMemberMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {DecoratedElement} from "./DecoratedElement";

/**
 * class that implement Parameter for executable class members
 *
 * @public
 */
export abstract class Parameter<T extends object = object> extends DecoratedElement<T> {

    /**
     * @protected
     * @readonly
     * @property position - index (position) of parameter
     */
    protected readonly _index: number;

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
     * @public
     * @param metadataClass - class that contains method with current parameter
     * @param name - method name
     * @param isStatic - flag that indicates if method is static
     * @param index - index (position) of parameter
     */
    public constructor(metadataClass: IMetadataClass<T>,
                       name: string,
                       isStatic: boolean,
                       index: number) {
        super(metadataClass);
        this._name = name;
        this._isStatic = isStatic;
        this._index = index;
    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.PARAMETER;
    }

    /**
     * method to get current index (position) of parameter
     *
     * @public
     * @returns _index of argument
     */
    public getIndex(): number {
        return this._index;
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
     * @inheritDoc
     */
    protected isDecoratorOf(target: IMetadataClass<unknown>, decorator: IMetatableDecorator): boolean {
        const metadata: IMemberMetadata = decorator.__metadata__;
        return metadata.type === this.getType()
            && metadata.name === this._name
            && metadata.isStatic === this._isStatic
            && metadata.owner === target
            && metadata.parameterIndex === this._index;
    }

    /**
     * @inheritDoc
     */
    // TODO add extra length check
    protected getMemberDecorators(memberMetadataTable: Empty<IMemberMetadataTableRef>): IMetatableDecorator[] {
        return memberMetadataTable?._parameters[this._index] ?? [];
    }

}

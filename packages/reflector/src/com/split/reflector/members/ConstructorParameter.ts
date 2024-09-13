import {classOfObject, IClass, isObjectClass, Empty} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {getKnownConstructorParameterLength, metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {Parameter} from "./Parameter";

/**
 * class that implement constructor parameter
 *
 * @public
 */
export class ConstructorParameter<T extends object = object> extends Parameter<T> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.CONSTRUCTOR_PARAMETER;
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): this {
        if (this._index < getKnownConstructorParameterLength(this._class)) {
            this.getDecoratorFn(decoratorOrFn).apply(undefined, [this._class, undefined, this._index]);
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): this {
        const owner: object = this.getObject();
        if (isObjectClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (classOfObject(decorator) === decoratorClass && this.isDecoratorOf(metadataClassOfObject(owner), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(metadataClassOfObject(owner), decorator)) {
                this._metadataTableProvider.remove(decorator);
            }
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    protected getMemberMetadataTable(metadataTable: IMetadataTableRef): Empty<IMemberMetadataTableRef> {
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._constructors._static : metadataTable._constructors._instance;
        return memberMetadataTables.get(this._name);
    }
}

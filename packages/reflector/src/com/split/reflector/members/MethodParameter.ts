import {classOfObject, getPropertyDescriptor, IClass, IFunction, isObjectClass, Empty} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {Parameter} from "./Parameter";

/**
 * class that implement method parameter
 * @public
 */
export class MethodParameter<T extends object = object> extends Parameter<T> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.METHODS_PARAMETER;
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Empty<Decorator | DecoratorFn>): this {
        const owner: object = this.getObject();
        const descriptor: Empty<PropertyDescriptor> = getPropertyDescriptor(owner, this._name);
        if (descriptor) {
            const method: Empty<IFunction<unknown>> = descriptor.value as Empty<IFunction<unknown>>;
            if (method) {
                if (this._index < method.length) {
                    this.getDecoratorFn(decoratorOrFn).apply(undefined, [owner, this._name, this._index]);
                }
            }
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
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._methods._static : metadataTable._methods._instance;
        return memberMetadataTables.get(this._name);
    }
}

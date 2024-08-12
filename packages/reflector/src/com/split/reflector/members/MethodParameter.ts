import {classOfObject, getPropertyDescriptor, IClass, IFunction, isObjectClass, Nullable} from "@semaver/core";
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
    public addDecorator(decoratorOrFn: Nullable<Decorator | DecoratorFn>): boolean {
        let result: boolean = false;
        const owner: object = this.getObject();
        const descriptor: Nullable<PropertyDescriptor> = getPropertyDescriptor(owner, this._name);
        if (descriptor) {
            const method: Nullable<IFunction<unknown>> = descriptor.value as Nullable<IFunction<unknown>>;
            if (method) {
                if (this._index < method.length) {
                    this.getDecoratorFn(decoratorOrFn).apply(undefined, [owner, this._name, this._index]);
                    result = true;
                }
            }
        }

        return result;
    }

    /**
     * @inheritDoc
     */
    public removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): boolean {
        let result: boolean = false;
        const owner: object = this.getObject();
        if (isObjectClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (classOfObject(decorator) === decoratorClass && this.isDecoratorOf(metadataClassOfObject(owner), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                    result = true;
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(metadataClassOfObject(owner), decorator)) {
                this._metadataTableProvider.remove(decorator);
                result = true;
            }
        }

        return result;
    }

    /**
     * @inheritDoc
     */
    protected getMemberMetadataTable(metadataTable: IMetadataTableRef): Nullable<IMemberMetadataTableRef> {
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._methods._static : metadataTable._methods._instance;
        return memberMetadataTables.get(this._name);
    }
}

import {CoreObject, CoreReflect, IClass, IFunction, Nullable} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {MetadataObject} from "../../extentions/MetadataObjectExtention";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementType} from "../../metatable/types/DecoratedElementType";
import {Parameter} from "./Parameter";

/**
 * @public
 * @class
 * @extends [[Parameter]]
 * @description - class that implement method [[Method]] parameter
 */
export class MethodParameter<T extends object = object> extends Parameter<T> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementType {
        return DecoratedElementType.METHODS_PARAMETER;
    }

    /**
     * @inheritDoc
     */
    public addDecorator<TDecorator extends Decorator>(decoratorOrFn: TDecorator | DecoratorFn): boolean {
        let result: boolean = false;
        const owner: Nullable<T> = this.getObject();
        const descriptor: Nullable<PropertyDescriptor> = CoreReflect.getDescriptor(owner, this._name);
        if (descriptor) {
            const method: Nullable<IFunction<unknown>> = descriptor?.value;
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
        const owner: Nullable<T> = this.getObject();
        if (CoreObject.isClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (CoreObject.classOf(decorator) === decoratorClass && this.isDecoratorOf(MetadataObject.classOf(owner), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                    result = true;
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(MetadataObject.classOf(owner), decorator)) {
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

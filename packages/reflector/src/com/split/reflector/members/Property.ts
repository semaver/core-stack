import {classOfObject, getPropertyOwner, IClass, isObjectClass, Nullable,} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {Field} from "./Field";

/**
 * class that implement Property class member
 *
 * @public
 */
export class Property<T extends object = object, TValue = unknown> extends Field<T, TValue> {

    /**
     * @public
     * @param metadataClass - class that contains current property
     * @param name - property name
     * @param isStatic - flag that indicates if property is static
     */
    public constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        isStatic: boolean) {
        super(
            metadataClass,
            name,
            isStatic);
    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.PROPERTY;
    }

    /**
     * @inheritDoc
     */
    public isGettable(): boolean {
        return true;
    }

    /**
     * @inheritDoc
     */
    public isSettable(): boolean {
        return true;
    }

    /**
     * @inheritDoc
     */
    public getValue(target: IClass<T> | T): Nullable<TValue> {
        this.validate(target);
        return Reflect.get(target, this._name) as Nullable<TValue>;
    }

    /**
     * @inheritDoc
     */
    public setValue(target: IClass<T> | T, value: Nullable<TValue>): void {
        this.validate(target);
        const owner: Nullable<unknown> = getPropertyOwner(target, this._name);
        if (owner) {
            Reflect.set(target, this._name, value);
        } else {
            Reflect.defineProperty(target, this._name, {value});
        }
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean {
        const target: object = this.getObject();
        this.getDecoratorFn(decoratorOrFn).apply(undefined, [target, this._name, undefined]);
        return true;
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
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._properties._static : metadataTable._properties._instance;
        return memberMetadataTables.get(this._name);
    }

}

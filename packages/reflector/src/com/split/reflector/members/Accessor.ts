import {classOfObject, getPropertyDescriptor, IClass, isObjectClass, Nullable, superClassOfObject} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {AccessType, ClassMemberAccessError} from "../../errors/ClassMemberAccessError";
import {metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementType, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementType";
import {Field} from "./Field";
import getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;

/**
 * @public
 * @class
 * @extends [[Field]]
 * @description - class that implement Accessor class member
 */
export class Accessor<T extends object = object, TValue = unknown> extends Field<T, TValue> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementType.ACCESSOR;
    }

    /**
     * @public
     * @constructor
     * @param metadataClass - class that contains current accessor
     * @param name - accessor name
     * @param isStatic - flag that indicates if accessor is static
     */
    public constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        isStatic: boolean) {
        super(metadataClass, name, isStatic);
    }

    /**
     * @inheritDoc
     */
    public isGettable(): boolean {
        if (this._isStatic) {
            return !!getOwnPropertyDescriptor(this._class, this._name)?.get;
        } else {
            let targetClass: Nullable<IClass<T>> = this._class;
            while (targetClass) {
                if (getOwnPropertyDescriptor(targetClass.prototype, this._name)?.get) {
                    return true;
                } else {
                    targetClass = superClassOfObject(targetClass, true);
                }
            }
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    public isSettable(): boolean {
        if (this._isStatic) {
            return !!getOwnPropertyDescriptor(this._class, this._name)?.set;
        } else {
            let targetClass: Nullable<IClass<T>> = this._class;
            while (targetClass) {
                if (getOwnPropertyDescriptor(targetClass.prototype, this._name)?.set) {
                    return true;
                } else {
                    targetClass = superClassOfObject(targetClass, true);
                }
            }
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    public getValue(target: IClass<T> | T): Nullable<TValue> {
        this.validate(target);

        if (!this.isGettable()) {
            throw new ClassMemberAccessError(this, this.getType(), this._name, AccessType.READ);
        }

        return Reflect.get(target, this._name) as Nullable<TValue>;
    }

    /**
     * @inheritDoc
     */
    public setValue(target: IClass<T> | T, value: Nullable<TValue>): void {
        this.validate(target);

        if (!this.isSettable()) {
            throw new ClassMemberAccessError(this, this.getType(), this._name, AccessType.WRITE);
        }

        Reflect.set(target, this._name, value);
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean {
        let result: boolean = false;
        const target: object = this.getObject();
        const descriptor: Nullable<PropertyDescriptor> = getPropertyDescriptor(target, this._name);
        if (descriptor) {
            this.getDecoratorFn(decoratorOrFn).apply(undefined, [target, this._name, descriptor]);
            result = true;
        }

        return result;
    }

    /**
     * @inheritDoc
     */
    public removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): boolean {
        let result: boolean = false;
        const target: object = this.getObject();
        if (isObjectClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (classOfObject(decorator) === decoratorClass && this.isDecoratorOf(metadataClassOfObject(target), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                    result = true;
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(metadataClassOfObject(target), decorator)) {
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
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._accessors._static : metadataTable._accessors._instance;
        return memberMetadataTables.get(this._name);
    }

}

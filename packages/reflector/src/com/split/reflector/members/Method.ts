import {CoreObject, CoreReflect, IClass, IFunction, Nullable} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {ClassMemberNotExistenceError} from "../../errors/ClassMemberNotExistenceError";
import {ClassMemberTargetObjectTypeError} from "../../errors/ClassMemberTargetObjectTypeError";
import {ClassMemberTargetUndefinedError} from "../../errors/ClassMemberTargetUndefinedError";
import {MethodNotFoundError} from "../../errors/MethodNotFoundError";
import {MetadataObject} from "../../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementType} from "../../metatable/types/DecoratedElementType";
import {ExecutableMember} from "./ExecutableMember";
import {Parameter} from "./Parameter";

/**
 * @public
 * @class
 * @extends [[ExecutableMember]]
 * @description - class that implement Method class member
 */
export class Method<T extends object = object, TReturnType = unknown> extends ExecutableMember<T> {
    /**
     * @public
     * @method
     * @param metadataClass - class that contains current method
     * @param name - method name
     * @param isStatic - flag that indicates if method is static
     * @param parameters - collection of method parameters [[Parameter]]
     */
    public constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        isStatic: boolean,
        parameters: Parameter<T>[]) {
        super(
            metadataClass,
            name,
            isStatic,
            parameters);

    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementType {
        return DecoratedElementType.METHOD;
    }

    /**
     * @inheritDoc
     */
    public getOwnParameterCount(): number {
        const method: Nullable<IFunction<TReturnType>> = CoreReflect.getDescriptor(
            this._isStatic ?
                this._class :
                this._class.prototype, this._name)?.value;
        if (method) {
            return method.length;
        } else {
            throw new MethodNotFoundError(this, this.getType(), this.getName());
        }
    }

    /**
     * @public
     * @method to call a method of static or instance method
     * @param target - class or instance that contains method
     * @param parameters - parameters used in method
     */
    public invoke(target: IClass<T> | T, ...parameters: any[]): TReturnType {
        this.validate(target);

        const method: Nullable<IFunction<TReturnType>> = Reflect.get(target, this._name) as Nullable<IFunction<TReturnType>>;

        if (method) {
            return Reflect.apply(method, target, parameters);
        } else {
            throw new MethodNotFoundError(this, this.getType(), this.getName());
        }
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean {
        let result: boolean = false;
        const target: Nullable<T> = this.getObject();
        const descriptor: Nullable<PropertyDescriptor> = CoreReflect.getDescriptor(target, this._name);
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
        const target: Nullable<T> = this.getObject();
        if (CoreObject.isClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (CoreObject.classOf(decorator) === decoratorClass && this.isDecoratorOf(MetadataObject.classOf(target), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                    result = true;
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(MetadataObject.classOf(target), decorator)) {
                this._metadataTableProvider.remove(decorator);
                result = true;
            }
        }

        return result;
    }

    /**
     * @protected
     * @method to validate target before method invoke;
     * @param target - instance for instance methods or class for static methods
     */
    protected validate(target: IClass<T> | T): void {
        if (!target) {
            throw new ClassMemberTargetUndefinedError(this, this.getType(), this._name);
        }

        if (!(this._name in target)) {
            throw new ClassMemberNotExistenceError(this, this.getType(), this._name, target);
        }

        if (CoreObject.isClass(target) && !this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, true);
        }

        if (!CoreObject.isClass(target) && this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, false);
        }
    }

    /**
     * @inheritDoc
     */
    protected getMemberMetadataTable(metadataTable: IMetadataTableRef): Nullable<IMemberMetadataTableRef> {
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._methods._static : metadataTable._methods._instance;
        return memberMetadataTables.get(this._name);
    }
}

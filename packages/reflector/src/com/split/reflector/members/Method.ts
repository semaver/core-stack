import {classOfObject, getPropertyDescriptor, IClass, IFunction, isObjectClass, Empty} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {ClassMemberNotExistenceError} from "../../errors/ClassMemberNotExistenceError";
import {ClassMemberTargetObjectTypeError} from "../../errors/ClassMemberTargetObjectTypeError";
import {ClassMemberTargetUndefinedError} from "../../errors/ClassMemberTargetUndefinedError";
import {MethodNotFoundError} from "../../errors/MethodNotFoundError";
import {metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {ExecutableMember} from "./ExecutableMember";
import {Parameter} from "./Parameter";

/**
 * class that implement Method class member
 * @public
 */
export class Method<T extends object = object, TReturnType = unknown> extends ExecutableMember<T> {
    /**
     * @public
     * @param metadataClass - class that contains current method
     * @param name - method name
     * @param isStatic - flag that indicates if method is static
     * @param parameters - collection of method parameters
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
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.METHOD;
    }

    /**
     * @inheritDoc
     */
    public getOwnParameterCount(): number {
        const method: Empty<IFunction<TReturnType>> = getPropertyDescriptor(
            (this._isStatic ? this._class : this._class.prototype) as object,
            this._name)?.value as Empty<IFunction<TReturnType>>;
        if (method) {
            return method.length;
        } else {
            throw new MethodNotFoundError(this, this.getType(), this.getName());
        }
    }

    /**
     * method to call a method of static or instance method
     *
     * @public
     * @param target - class or instance that contains method
     * @param parameters - parameters used in method
     * @returns method invocation result
     */
    public invoke(target: IClass<T> | T, ...parameters: any[]): TReturnType {
        this.validate(target);

        const method: Empty<IFunction<TReturnType>> = Reflect.get(target, this._name) as Empty<IFunction<TReturnType>>;

        if (method) {
            return Reflect.apply(method, target, parameters);
        } else {
            throw new MethodNotFoundError(this, this.getType(), this.getName());
        }
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): this {
        const target: object = this.getObject();
        const descriptor: Empty<PropertyDescriptor> = getPropertyDescriptor(target, this._name);
        if (descriptor) {
            this.getDecoratorFn(decoratorOrFn).apply(undefined, [target, this._name, descriptor]);
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): this {
        const target: object = this.getObject();
        if (isObjectClass(decoratorOrClass)) {
            const decoratorClass: IClass<Decorator> = decoratorOrClass as IClass<Decorator>;
            this._metadataTableProvider.getOwnDecorators().forEach(decorator => {
                if (classOfObject(decorator) === decoratorClass && this.isDecoratorOf(metadataClassOfObject(target), decorator)) {
                    this._metadataTableProvider.remove(decorator);
                }
            });
        } else {
            const decorator: IMetatableDecorator = decoratorOrClass as IMetatableDecorator;
            if (this.isDecoratorOf(metadataClassOfObject(target), decorator)) {
                this._metadataTableProvider.remove(decorator);
            }
        }

        return this;
    }

    /**
     * method to validate target before method invocation;
     *
     * @protected
     * @param target - instance for instance methods or class for static methods
     */
    protected validate(target: Empty<IClass<T> | T>): void {
        if (!target) {
            throw new ClassMemberTargetUndefinedError(this, this.getType(), this._name);
        }

        if (!(this._name in target)) {
            throw new ClassMemberNotExistenceError(this, this.getType(), this._name, target);
        }

        if (isObjectClass(target) && !this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, true);
        }

        if (!isObjectClass(target) && this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, false);
        }
    }

    /**
     * @inheritDoc
     */
    protected getMemberMetadataTable(metadataTable: IMetadataTableRef): Empty<IMemberMetadataTableRef> {
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._methods._static : metadataTable._methods._instance;
        return memberMetadataTables.get(this._name);
    }
}

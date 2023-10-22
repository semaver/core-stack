import {CoreObject, IClass, Nullable} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {DecoratorUndefinedError} from "../../errors/DecoratorUndefinedError";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {MetadataTableProvider} from "../../metatable/MetadataTableProvider";
import {DecoratedElementType} from "../../metatable/types/DecoratedElementType";
import {IDecoratedElement} from "./IDecoratedElement";

/**
 * @public
 * @abstract
 * @class
 * @implements [[IDecoratedElement]]
 * @description -  base class for all decorated class members and parameters
 */
export abstract class DecoratedElement<T extends object = object> implements IDecoratedElement<T> {

    /**
     * @protected
     * @readonly
     * @property _class - class that contains current class member
     */
    protected readonly _class: IMetadataClass<T>;

    /**
     * @protected
     * @readonly
     * @property _metadataTable - metatable provider [[MetadataTableProvider]] for decorated element
     */
    protected readonly _metadataTableProvider: MetadataTableProvider<T>;


    /**
     * @protected
     * @constructor
     * @param metadataClass - class that contains current decorated element
     */
    protected constructor(metadataClass: IMetadataClass<T>) {
        this._metadataTableProvider = new MetadataTableProvider(metadataClass);
        this._class = metadataClass;
    }

    /**
     * @inheritDoc
     */
    public abstract getName(): string;

    /**
     * @inheritDoc
     */
    public abstract isStatic(): boolean;

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementType {
        return DecoratedElementType.DECORATED_ELEMENT;
    }

    /**
     * @inheritDoc
     */
    public getClass(): IClass<T> {
        return this._class;
    }

    /**
     * @inheritDoc
     */
    public hasDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        if (decoratorClasses.length) {
            return this.getMetadataDecorators().some((decorator) => decoratorClasses.indexOf(CoreObject.classOf(decorator)) !== -1);
        } else {
            return !!this.getMetadataDecorators().length;
        }
    }

    /**
     * @inheritDoc
     */
    public hasOwnDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        if (decoratorClasses.length) {
            return this.getOwnMetadataDecorators().some((decorator) => decoratorClasses.indexOf(CoreObject.classOf(decorator)) !== -1);
        } else {
            return !!this.getOwnMetadataDecorators().length;
        }
    }

    /**
     * @inheritDoc
     */
    public getDecorators(...decoratorClasses: IClass<Decorator>[]): ReadonlyArray<Decorator> {
        if (decoratorClasses.length) {
            const decorators: Decorator[] = [];
            return this.getMetadataDecorators().reduce((result, decorator) => {
                if (decoratorClasses.indexOf(CoreObject.classOf(decorator)) !== -1) {
                    result.push(decorator);
                }
                return result;
            }, decorators);
        } else {
            return this.getMetadataDecorators();
        }
    }

    /**
     * @inheritDoc
     */
    public getOwnDecorators(...decoratorClasses: IClass<Decorator>[]): ReadonlyArray<Decorator> {
        if (decoratorClasses.length) {
            const decorators: Decorator[] = [];
            return this.getOwnMetadataDecorators().reduce((result, decorator) => {
                if (decoratorClasses.indexOf(CoreObject.classOf(decorator)) !== -1) {
                    result.push(decorator);
                }
                return result;
            }, decorators);
        } else {
            return this.getOwnMetadataDecorators();
        }
    }

    /**
     * @inheritDoc
     */
    public abstract addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean;

    /**
     * @inheritDoc
     */
    public addDecorators(...decoratorOrFnCollection: (Decorator | DecoratorFn)[]): boolean {
        let result: boolean = true;
        decoratorOrFnCollection.forEach(decoratorOrFn => {
            result = this.addDecorator(decoratorOrFn) && result;
        });
        return result;
    }


    /**
     * @inheritDoc
     */
    public abstract removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): boolean;

    /**
     * @inheritDoc
     */
    public removeDecorators(...decoratorOrClassCollection: (IClass<Decorator> | Decorator)[]): boolean {
        let result: boolean = true;
        decoratorOrClassCollection.forEach(decoratorOrClass => {
            result = this.removeDecorator(decoratorOrClass) && result;
        });
        return result;
    }

    /**
     * @protected
     * @method to get collection of full proceeded decorators
     * @return collection of full proceeded decorators
     */
    protected getMetadataDecorators(): IMetatableDecorator[] {
        const metadataTable: IMetadataTableRef = this._metadataTableProvider.getMetadataTable();
        const memberMetadataTable: Nullable<IMemberMetadataTableRef> = this.getMemberMetadataTable(metadataTable);
        return this.getMemberDecorators(memberMetadataTable);
    }

    /**
     * @protected
     * @method to get collection of own decorators
     * @return collection of own decorators
     */
    protected getOwnMetadataDecorators(): IMetatableDecorator[] {
        const metadataTable: IMetadataTableRef = this._metadataTableProvider.getOwnMetadataTable();
        const memberMetadataTable: Nullable<IMemberMetadataTableRef> = this.getMemberMetadataTable(metadataTable);
        return this.getMemberDecorators(memberMetadataTable);
    }

    /**
     * @protected
     * @abstract
     * @method to get class member metadata table [[IMemberMetadataTableRef]]
     * @param metadataTable  - class metadata table [[IMetadataTableRef]]
     * @return class member metadata table
     */
    protected abstract getMemberMetadataTable(metadataTable: IMetadataTableRef): Nullable<IMemberMetadataTableRef>;

    /**
     * @protected
     * @abstract
     * @method to get collection of decorators from class member metadata table
     * @param memberMetadataTable - class member metadata table [[IMemberMetadataTableRef]]
     * @return collection of decorators
     */
    protected abstract getMemberDecorators(memberMetadataTable: Nullable<IMemberMetadataTableRef>): IMetatableDecorator[];

    /**
     * @protected
     * @method to get decorator function [[DecoratorFn]]
     * @param decoratorOrFn - decorator or decorator function
     * @return decorator function
     */
    protected getDecoratorFn(decoratorOrFn: Decorator | DecoratorFn): DecoratorFn {
        if (decoratorOrFn) {
            if (decoratorOrFn instanceof Decorator) {
                return Decorator.build(decoratorOrFn);
            } else {
                return decoratorOrFn;
            }
        } else {
            throw new DecoratorUndefinedError(this);
        }
    }


    /**
     * @protected
     * @abstract
     * @method to check if decorator is of current decorated element
     * @param target - provided class [[IClass]]
     * @param decorator - provided decorator [[IMetatableDecorator]]
     * @return true if decorator is of current decorated element
     */
    protected abstract isDecoratorOf(target: IClass<unknown>, decorator: IMetatableDecorator): boolean;

    /**
     * @protected
     * @method to get decorated object (class or instance)
     * @return decorated object
     */
    protected getObject(): T {
        return this.isStatic() ? this._class : this._class.prototype;
    }

}

import {classOfObject, IClass, Nullable} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {DecoratorUndefinedError} from "../../errors/DecoratorUndefinedError";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {MetadataTableProvider} from "../../metatable/MetadataTableProvider";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {IDecoratedElement} from "./IDecoratedElement";

/**
 * base class for all decorated class members and parameters
 *
 * @public
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
     * @property _metadataTable - metatable provider for decorated element
     */
    protected readonly _metadataTableProvider: MetadataTableProvider<T>;


    /**
     * @protected
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
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.DECORATED_ELEMENT;
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
            return this.getMetadataDecorators().some((decorator) => decoratorClasses.includes(classOfObject(decorator)));
        } else {
            return !!this.getMetadataDecorators().length;
        }
    }

    /**
     * @inheritDoc
     */
    public hasOwnDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        if (decoratorClasses.length) {
            return this.getOwnMetadataDecorators().some((decorator) => decoratorClasses.includes(classOfObject(decorator)));
        } else {
            return !!this.getOwnMetadataDecorators().length;
        }
    }

    /**
     * @inheritDoc
     */
    public getDecorators(...decoratorClasses: IClass<Decorator>[]): readonly Decorator[] {
        if (decoratorClasses.length) {
            const decorators: Decorator[] = [];
            return this.getMetadataDecorators().reduce((result, decorator) => {
                if (decoratorClasses.includes(classOfObject(decorator))) {
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
    public getOwnDecorators(...decoratorClasses: IClass<Decorator>[]): readonly Decorator[] {
        if (decoratorClasses.length) {
            const decorators: Decorator[] = [];
            return this.getOwnMetadataDecorators().reduce((result, decorator) => {
                if (decoratorClasses.includes(classOfObject(decorator))) {
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
     * method to get a collection of full proceeded decorators
     *
     * @protected
     * @returns collection of full proceeded decorators
     */
    protected getMetadataDecorators(): IMetatableDecorator[] {
        const metadataTable: IMetadataTableRef = this._metadataTableProvider.getMetadataTable();
        const memberMetadataTable: Nullable<IMemberMetadataTableRef> = this.getMemberMetadataTable(metadataTable);
        return this.getMemberDecorators(memberMetadataTable);
    }

    /**
     * method to get a collection of own decorators
     *
     * @protected
     * @returns collection of own decorators
     */
    protected getOwnMetadataDecorators(): IMetatableDecorator[] {
        const metadataTable: IMetadataTableRef = this._metadataTableProvider.getOwnMetadataTable();
        const memberMetadataTable: Nullable<IMemberMetadataTableRef> = this.getMemberMetadataTable(metadataTable);
        return this.getMemberDecorators(memberMetadataTable);
    }

    /**
     * method to get class member metadata table
     *
     * @protected
     * @param metadataTable  - class metadata table
     * @returns class member metadata table
     */
    protected abstract getMemberMetadataTable(metadataTable: IMetadataTableRef): Nullable<IMemberMetadataTableRef>;

    /**
     * method to get a collection of decorators from class member metadata table
     *
     * @protected
     * @param memberMetadataTable - class member metadata table
     * @returns collection of decorators
     */
    protected abstract getMemberDecorators(memberMetadataTable: Nullable<IMemberMetadataTableRef>): IMetatableDecorator[];

    /**
     * method to get decorator function
     *
     * @protected
     * @param decoratorOrFn - decorator or decorator function
     * @returns decorator function
     */
    protected getDecoratorFn(decoratorOrFn: Nullable<Decorator | DecoratorFn>): DecoratorFn {
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
     * method to check if decorator is of current decorated element
     *
     * @protected
     * @param target - provided class
     * @param decorator - provided decorator
     * @returns true if decorator is of the current decorated element
     */
    protected abstract isDecoratorOf(target: IClass<unknown>, decorator: IMetatableDecorator): boolean;

    /**
     * method to get decorated object (class or instance)
     *
     * @protected
     * @returns decorated object
     */
    protected getObject(): object {
        return (this.isStatic() ? this._class : this._class.prototype) as object;
    }

}

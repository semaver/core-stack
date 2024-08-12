import {classOfObject, IClass, isObjectClass, Nullable} from "@semaver/core";
import {Decorator, DecoratorFn, IMetatableDecorator} from "../../decorators/Decorator";
import {metadataClassOfObject} from "../../extentions/MetadataObjectExtention";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {IMemberMetadataTableRef, IMetadataTableRef} from "../../metatable/metadata/IMetadataTableRef";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {ExecutableMember} from "./ExecutableMember";
import {Parameter} from "./Parameter";

/**
 * class that implement Constructor class member
 *
 * @public
 */
export class Constructor<T extends object = object> extends ExecutableMember<T> {

    public static defaultName: string = "ctor";

    /**
     * @public
     * @param metadataClass - class that contains current constructor
     * @param name
     * @param parameters - collection of constructor arguments
     */
    public constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        parameters: Parameter<T>[]) {
        super(
            metadataClass,
            name,
            false,
            parameters);

    }

    /**
     * @inheritDoc
     */
    public isOwn(): boolean {
        return true;
    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.CONSTRUCTOR;
    }

    /**
     * @inheritDoc
     */
    public getOwnParameterCount(): number {
        return this._class.length;
    }

    /**
     * method to create new instance from constructor/class
     *
     * @public
     * @param parameters - parameters used in constructor
     * @returns newly created instance applying parameters
     */
    public newInstance(...parameters: any[]): T {
        return Reflect.construct(this._class, parameters);
    }

    /**
     * @inheritDoc
     */
    public addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean {
        const target: object = this.getObject();
        this.getDecoratorFn(decoratorOrFn).apply(undefined, [target, undefined, undefined]);
        return true;
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
        const memberMetadataTables: Map<string, IMemberMetadataTableRef> = this._isStatic ? metadataTable._constructors._static : metadataTable._constructors._instance;
        return memberMetadataTables.get(this._name);
    }
}

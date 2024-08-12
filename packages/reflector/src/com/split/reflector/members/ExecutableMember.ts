import {IClass, Nullable} from "@semaver/core";
import {Decorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {DecoratedElementType, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementType";
import {ClassMember} from "./ClassMember";
import {Parameter} from "./Parameter";

/**
 * @public
 * @abstract
 * @class
 * @extends [[ClassMember]]
 * @description - abstract class that implement Executable api and contains core functionality for executable class members
 */
export abstract class ExecutableMember<T extends object = object> extends ClassMember<T> {
    /**
     * @protected
     * @readonly
     * @property _parameters - collection of parameters [[Parameter]]
     */
    protected readonly _parameters: Parameter<T>[] = [];

    /**
     * @protected
     * @constructor
     * @param metadataClass - class that contains current class member
     * @param name - class member name
     * @param isStatic - flag that indicates if class member is static
     * @param parameters - collection of parameters [[Parameter]]
     */
    protected constructor(
        metadataClass: IMetadataClass<T>,
        name: string,
        isStatic: boolean,
        parameters: Parameter<T>[]) {
        super(metadataClass, name, isStatic);

        this._parameters = parameters;
    }

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementType.EXECUTABLE_ELEMENT;
    }

    /**
     * @public
     * @method to get known parameter count from reflection api
     * @description - myMethodA(...args) return argument length == 0, myMethodA(someArg1, someArg2, ...args) return argument length == 2
     * @return known parameter count
     */
    public getKnownParameterCount(): number {
        return this._parameters.length;
    }

    /**
     * @public
     * @abstract
     * @method to get own parameter count from descriptor api
     * @description - myMethodA(...args) return argument length == 0, myMethodA(someArg1, someArg2, ...args) return argument length == 2
     * @return own parameter count
     */
    public abstract getOwnParameterCount(): number;

    /**
     * @public
     * @method to get parameters from provided executable class
     * @return copy of parameters collection [[Parameter]]
     */
    public getParameters(): readonly Parameter<T>[] {
        return this._parameters;
    }

    /**
     * @public
     * @method to get parameter at specific index (position)
     * @param index - index (position) of parameter
     * @return parameter if found or undefined
     */
    public getParameterAt(index: number): Nullable<Parameter<T>> {
        return 0 <= index && index < this._parameters.length ? this._parameters[index] : undefined;
    }

    /**
     * @public
     * @method to check if executable class member has own parameter decorators
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @return true if decorators found
     */
    public hasOwnParameterDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        return this._parameters.some((parameter) => parameter.hasOwnDecorators(...decoratorClasses));
    }

    /**
     * @public
     * @method to check if executable class member has full proceeded parameter decorators
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @return true if decorators found
     */
    public hasParameterDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        return this._parameters.some((parameter) => parameter.hasDecorators(...decoratorClasses));
    }

    /**
     * @public
     * @method to get full proceeded parameter decorators from provided executable class
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @return readonly collection of parameters decorators by index (position)
     */
    public getParameterDecorators(...decoratorClasses: IClass<Decorator>[]): readonly (readonly Decorator[])[] {
        const decorators: (readonly Decorator[])[] = [];
        return this._parameters.reduce((result, parameter) => {
            result.push(parameter.getDecorators(...decoratorClasses));
            return result;
        }, decorators);
    }

    /**
     * @public
     * @method to get own parameter decorators from provided executable class
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @return readonly collection of parameters decorators by index (position)
     */
    public getOwnParameterDecorators(...decoratorClasses: IClass<Decorator>[]): readonly (readonly Decorator[])[] {
        const decorators: (readonly Decorator[])[] = [];
        return this._parameters.reduce((result, parameter) => {
            result.push(parameter.getOwnDecorators(...decoratorClasses));
            return result;
        }, decorators);
    }
}

import {IClass, Nullable} from "@semaver/core";
import {Decorator} from "../../decorators/Decorator";
import {IMetadataClass} from "../../metatable/classes/IMetadataClass";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {ClassMember} from "./ClassMember";
import {Parameter} from "./Parameter";

/**
 * abstract class that implement Executable api and contains core functionality for executable class members
 * @public
 */
export abstract class ExecutableMember<T extends object = object> extends ClassMember<T> {
    /**
     * @protected
     * @readonly
     * @property _parameters - collection of parameters
     */
    protected readonly _parameters: Parameter<T>[] = [];

    /**
     * @protected
     * @param metadataClass - class that contains current class member
     * @param name - class member name
     * @param isStatic - flag that indicates if class member is static
     * @param parameters - collection of parameters
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
        return DecoratedElementEnum.EXECUTABLE_ELEMENT;
    }

    /**
     * method to get known parameter count from <b>reflection api<b>
     * myMethodA(...args) return argument length == 0,
     * myMethodA(someArg1, someArg2, ...args) return argument length == 2
     * myMethodA(someArg1, someArg2 = 1, ...args) return argument length == 1
     * the result is based on investigation of superclasses
     *
     * @public
     * @returns known parameter count
     */
    public getKnownParameterCount(): number {
        return this._parameters.length;
    }

    /**
     * method to get own parameter count from <b>descriptor api<b>
     * myMethodA(...args) return argument length == 0,
     * myMethodA(someArg1, someArg2, ...args) return argument length == 2
     * myMethodA(someArg1, someArg2 = 1, ...args) return argument length == 1
     *
     * @public
     * @returns own parameter count
     */
    public abstract getOwnParameterCount(): number;

    /**
     * method to get parameters from provided executable class
     *
     * @public
     * @returns copy of parameters' collection
     */
    public getParameters(): readonly Parameter<T>[] {
        return this._parameters;
    }

    /**
     * method to get parameter at specific index (position)
     *
     * @public
     * @param index - index (position) of parameter
     * @returns parameter if found or undefined
     */
    public getParameterAt(index: number): Nullable<Parameter<T>> {
        return 0 <= index && index < this._parameters.length ? this._parameters[index] : undefined;
    }

    /**
     * method to check if executable class member has own parameter decorators
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @returns true if decorators found
     */
    public hasOwnParameterDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        return this._parameters.some((parameter) => parameter.hasOwnDecorators(...decoratorClasses));
    }

    /**
     * method to check if executable class member has full proceeded parameter decorators
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @returns true if decorators found
     */
    public hasParameterDecorators(...decoratorClasses: IClass<Decorator>[]): boolean {
        return this._parameters.some((parameter) => parameter.hasDecorators(...decoratorClasses));
    }

    /**
     * method to get full proceeded parameter decorators from provided executable class
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @returns readonly collection of parameters' decorators by index (position)
     */
    public getParameterDecorators(...decoratorClasses: IClass<Decorator>[]): readonly (readonly Decorator[])[] {
        const decorators: (readonly Decorator[])[] = [];
        return this._parameters.reduce((result, parameter) => {
            result.push(parameter.getDecorators(...decoratorClasses));
            return result;
        }, decorators);
    }

    /**
     * method to get own parameter decorators from provided executable class
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @returns readonly collection of parameters' decorators by index (position)
     */
    public getOwnParameterDecorators(...decoratorClasses: IClass<Decorator>[]): readonly (readonly Decorator[])[] {
        const decorators: (readonly Decorator[])[] = [];
        return this._parameters.reduce((result, parameter) => {
            result.push(parameter.getOwnDecorators(...decoratorClasses));
            return result;
        }, decorators);
    }
}

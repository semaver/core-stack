import {Decorator} from "../decorators/Decorator";
import {ClassTableUpdateTypes} from "./ClassTableUpdateTypes";
import {IClass} from "@semaver/core";
import {DecoratedElementType} from "../metatable/types/DecoratedElementType";

/**
 * @public
 * @interface
 * @description - generic data provided by class table updates to subscribers
 */
export interface IClassTableUpdate<TDecorator extends Decorator = Decorator, T = unknown> {
    /**
     * @public
     * @readonly
     * @property type - type of class table update [[ClassTableUpdateTypes]]
     */
    readonly type: ClassTableUpdateTypes;

    /**
     * @public
     * @readonly
     * @property decorator - decorator [[Decorator]] applied to provided class
     */
    readonly decorator: TDecorator;

    /**
     * @public
     * @readonly
     * @property targetClass - decorated class
     */
    readonly targetClass: IClass<T>;

    /**
     * @public
     * @readonly
     * @property decoratedElement - decorated element info
     */
    readonly decoratedElement: {
        /**
         * @public
         * @readonly
         * @property type - type of decorated element [[DecoratedElementType]]
         */
        readonly type: DecoratedElementType;

        /**
         * @public
         * @readonly
         * @property name - name of class member, in case of parameter - name of the method or class name for constructor
         */
        readonly name: string;

        /**
         * @public
         * @readonly
         * @property isStatic - flag that indicates if class member is static
         */
        readonly isStatic: boolean;


        /**
         * @public
         * @readonly
         * @property index - index(position) of current parameters
         */
        readonly parameterIndex: number;
    };
}
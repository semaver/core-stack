import {Decorator} from "../decorators/Decorator";
import {ClassTableUpdateTypes} from "./ClassTableUpdateTypes";
import {IClass} from "@semaver/core";
import {DecoratedElementTypeValues} from "../metatable/types/DecoratedElementEnum";

/**
 * payload delivered to each {@link IClassTableSubscriber} when the class table changes; carries the
 * update `type` (metadata added vs removed), the `decorator` involved, the affected `targetClass`,
 * and a `decoratedElement` descriptor (its type, name, static flag, and parameter index) identifying
 * which decorated member triggered the update.
 *
 * @public
 * @interface
 */
export interface IClassTableUpdate<TDecorator extends Decorator = Decorator, T = unknown> {
    /**
     * @public
     * @readonly
     * @property type - type of class table update
     */
    readonly type: ClassTableUpdateTypes;

    /**
     * @public
     * @readonly
     * @property decorator - decorator applied to the provided class
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
         * @property type - type of decorated element
         */
        readonly type: DecoratedElementTypeValues;

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
         * @property parameterIndex - index(position) of current parameter
         */
        readonly parameterIndex: number;
    };
}

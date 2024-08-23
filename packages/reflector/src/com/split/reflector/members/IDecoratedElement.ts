import {IClass} from "@semaver/core";
import {Decorator, DecoratorFn} from "../../decorators/Decorator";
import {DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";

/**
 * interface that represents decorated element (class member or parameter)
 *
 * @public
 * @interface
 */
export interface IDecoratedElement<T extends object = object> {

    /**
     * method to get the current class member type (can be constructor, method, accessor, property)
     *
     * @public
     * @returns current class member type
     * @see [[DecoratedElementTypeValues]]
     */
    getType(): DecoratedElementTypeValues;

    /**
     * method to get current class that contains current class member
     *
     * @public
     * @returns current class
     */
    getClass(): IClass<T>;

    /**
     * method to get current class member name
     *
     * @public
     * @returns current class member name
     */
    getName(): string;

    /**
     * method to get if class member is static or not
     *
     * @public
     * @returns true if class member is static
     */
    isStatic(): boolean;

    /**
     * method to check if the current element (class member or parameter) has full-proceeded decorators (inherited and own)
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @returns true if class member metadata found
     */
    hasDecorators(...decoratorClasses: IClass<Decorator>[]): boolean;

    /**
     * method to check if the current element (class member or parameter) has own decorators
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @returns true if class member metadata found
     */
    hasOwnDecorators(...decoratorClasses: IClass<Decorator>[]): boolean;

    /**
     * method to get readonly collection of elements (class member or parameter) full-proceeded decorators (inherited and own)
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @returns readonly collection of decorators
     */
    getDecorators(...decoratorClasses: IClass<Decorator>[]): readonly Decorator[];

    /**
     * method to get a readonly collection of elements (class member or parameter) own decorators
     *
     * @public
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @returns readonly collection of decorators
     */
    getOwnDecorators(...decoratorClasses: IClass<Decorator>[]): readonly Decorator[];

    /**
     * method to add decorator to the element (class member or parameter), decorator will be added to the element (class member or parameter) of the owner class
     *
     * @public
     * @param decoratorOrFn - decorator that extends or decorator function
     * @returns - return current instance
     */
    addDecorator(decoratorOrFn: Decorator | DecoratorFn): this;

    /**
     * method to add decorators to the element (class member or parameter), decorator will be added to the element (class member or parameter) of the owner class
     *
     * @public
     * @param decoratorOrFnCollection - collection of decorators that extends or decorator function
     * @returns - return current instance
     */
    addDecorators(...decoratorOrFnCollection: (Decorator | DecoratorFn)[]): this;

    /**
     * method to remove decorator/s from class members, decorator will be removed from the element (class member or parameter) of the owner class
     *
     * @public
     * @param decoratorOrClass - class of current decorator or decorator itself
     * @returns - return current instance
     */
    removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): this;

    /**
     * method to remove decorator/s from class members, decorator will be removed from the element (class member or parameter) of the owner class
     *
     * @public
     * @param decoratorOrClassCollection - collection of classes of current decorator or decorators itself
     * @returns - return current instance
     */
    removeDecorators(...decoratorOrClassCollection: (IClass<Decorator> | Decorator)[]): this;
}

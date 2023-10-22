import {IClass} from "@semaver/core";
import {Decorator, DecoratorFn} from "../../decorators/Decorator";
import {DecoratedElementType} from "../../metatable/types/DecoratedElementType";

/**
 * @public
 * @interface
 * @description interface that represent decorated element (class member or parameter)
 */
export interface IDecoratedElement<T extends object = object> {

    /**
     * @public
     * @method to get current class member type from [[DecoratedElementType]] (can be constructor, method, accessor, property)
     * @return current class member type
     */
    getType(): DecoratedElementType;

    /**
     * @public
     * @method to get current class that contains current class member
     * @return current class
     */
    getClass(): IClass<T>;

    /**
     * @public
     * @method to get current class member name
     * @return current class member name
     */
    getName(): string;

    /**
     * @public
     * @method to get if class member is static or not
     * @return true if class member is static
     */
    isStatic(): boolean;

    /**
     * @public
     * @method to check if current element (class member or parameter) has full proceeded decorators
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @return true if class member metadata found
     */
    hasDecorators(...decoratorClasses: IClass<Decorator>[]): boolean;

    /**
     * @public
     * @method to check if current element (class member or parameter) has own decorators
     * @param decoratorClasses - collection of decorator classes to check (can be omitted)
     * @return true if class member metadata found
     */
    hasOwnDecorators(...decoratorClasses: IClass<Decorator>[]): boolean;

    /**
     * @public
     * @method to get readonly collection of element (class member or parameter) full proceeded decorators
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @return readonly collection of decorators
     */
    getDecorators(...decoratorClasses: IClass<Decorator>[]): ReadonlyArray<Decorator>;

    /**
     * @public
     * @method to get readonly collection of element (class member or parameter) own decorators
     * @param decoratorClasses - collection of decorator classes to get (can be omitted)
     * @return readonly collection of decorators
     */
    getOwnDecorators(...decoratorClasses: IClass<Decorator>[]): ReadonlyArray<Decorator>;

    /**
     * @public
     * @method to add decorator to element (class member or parameter), decorator will be added to the element (class member or parameter) of the owner class
     * @param decoratorOrFn - decorator that extends [[Decorator]] or decorator function
     * @return - return true if decoration was successful
     */
    addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean;

    /**
     * @public
     * @method to add decorators to element (class member or parameter), decorator will be added to the element (class member or parameter) of the owner class
     * @param decoratorOrFnCollection - collection of decorators that extends [[Decorator]] or decorator function
     * @return - return true if all decorations was successful
     */
    addDecorators(...decoratorOrFnCollection: (Decorator | DecoratorFn)[]): boolean;

    /**
     * @public
     * @method to remove decorator/s from class members, decorator will be removed from the element (class member or parameter) of the owner class
     * @param decoratorOrClass - class of current decorator [[Decorator]] or decorator it self
     * @return - return true if removal of decorator was successful
     */
    removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): boolean;

    /**
     * @public
     * @method to remove decorator/s from class members, decorator will be removed from the element (class member or parameter) of the owner class
     * @param decoratorOrClassCollection - collection of classes of current decorator [[Decorator]] or decorators it self
     * @return - return true if removal of all decorator was successful
     */
    removeDecorators(...decoratorOrClassCollection: (IClass<Decorator> | Decorator)[]): boolean;
}

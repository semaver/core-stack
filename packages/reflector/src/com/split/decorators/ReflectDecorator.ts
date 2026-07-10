import {Decorator, DecoratorFn} from "./Decorator";

/**
 * factory for the `@reflect()` decorator; applying the returned decorator to a class member
 * registers that member in the metatable with all default policies and no custom behavior
 * (empty parameters).
 *
 * @public
 * @returns decorator function
 */
export function reflect(): DecoratorFn {
    return Decorator.build(new ReflectDecorator());
}

/**
 * class to create empty decorator with all default policies to mark a class member to be registered in metatable
 *
 * @public
 */
export class ReflectDecorator extends Decorator {
}

import {Decorator, DecoratorFn} from "./Decorator";

/**
 * decorator function to create/build reflect decorator
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

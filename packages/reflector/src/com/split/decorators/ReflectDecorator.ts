import {Decorator, DecoratorFn} from "./Decorator";

/**
 * @global
 * @public
 * @function
 * @return decorator function [[DecoratorFn]]
 * @description - decorator function [[DecoratorFn]] to create/build reflect decorator [[ReflectDecorator]]
 */
export function reflect(): DecoratorFn {
    return Decorator.build(new ReflectDecorator());
}

/**
 * @public
 * @class
 * @extends [[Decorator]]
 * @description - class to create empty decorator with all default policies to mark a class member to be registered in metatable
 */
export class ReflectDecorator extends Decorator {
}

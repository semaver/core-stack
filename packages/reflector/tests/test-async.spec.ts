import {DecoratedElementEnum, Method, ReflectDecorator, Reflector} from "../src";
import {AsyncSuperClass} from "./reflector/asyncs/AsyncSuperClass";
import {Nullable} from "@semaver/core";

describe("Reflector Async tests", () => {

    it("test async decoration ", async () => {
        const reflector: Reflector<AsyncSuperClass> = Reflector.from(AsyncSuperClass);
        const method: Nullable<Method<AsyncSuperClass, Promise<number>>> = reflector.getMethod<Promise<number>>("asyncMethod");

        expect(method?.getParameters().length).toBe(2);
        expect(method?.getKnownParameterCount()).toBe(2);
        expect(method?.getOwnParameterCount()).toBe(2);
        expect(method?.hasDecorators(ReflectDecorator)).toBeTruthy();
        expect(method?.getParameterAt(0)?.hasDecorators(ReflectDecorator)).toBeTruthy();
        expect(method?.getParameterAt(1)?.hasDecorators(ReflectDecorator)).toBeFalsy();

        expect(method?.getName()).toBe("asyncMethod");
        expect(method?.getClass()).toBe(AsyncSuperClass);
        expect(method?.getType()).toBe(DecoratedElementEnum.METHOD);

        const instance: AsyncSuperClass = new AsyncSuperClass();
        const input: number = 1;
        const result: Nullable<number> = await method?.invoke(instance, input, 2);
        expect(result).toBe(input);
        await expect(method?.invoke(instance, input, 2)).resolves.toBe(input);
    });
});

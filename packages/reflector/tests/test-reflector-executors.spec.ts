import {ByMemberName, ByStaticMember, Constructor, Method, Reflector} from "../src";
import {SuperDecoratedClass} from "./metatable/classes/SuperDecoratedClass";
import {Nullable} from "@semaver/core";

describe("Reflector API Executors", () => {

    it("test static method executor", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const runStatic: Nullable<Method<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("runStatic"))
            .filter(ByStaticMember.from(true))
            .members().first<Method<SuperDecoratedClass>>();

        expect(runStatic).toBeDefined();
        expect(() => runStatic?.invoke(SuperDecoratedClass)).not.toThrowError();
        expect(runStatic?.getKnownParameterCount()).toBe(1);
        expect(runStatic?.invoke(SuperDecoratedClass, 10)).toBe(10);
        expect(runStatic?.invoke(SuperDecoratedClass, 0, 20)).toBe(0);
    });

    it("test instance method executor", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const runNormal: Nullable<Method<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("runNormal"))
            .filter(ByStaticMember.from(false))
            .members()
            .first<Method<SuperDecoratedClass>>();

        expect(runNormal).toBeDefined();
        expect(() => runNormal?.invoke(undefined as never)).toThrowError();
        expect(runNormal?.getKnownParameterCount()).toBe(1);
        expect(runNormal?.invoke(new SuperDecoratedClass(), 10)).toBe(10);
        expect(runNormal?.invoke(new SuperDecoratedClass(), 0, 20)).toBe(0);
    });

    it("test constructor executor", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const runConstructor: Nullable<Constructor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from(Constructor.defaultName))
            .members()
            .first<Constructor<SuperDecoratedClass>>();

        expect(runConstructor).toBeDefined();
        expect(() => runConstructor?.newInstance(10)).not.toThrowError();
        expect(runConstructor?.getKnownParameterCount()).toBe(1);
        expect(runConstructor?.newInstance(10)).toBeInstanceOf(SuperDecoratedClass);

    });
});

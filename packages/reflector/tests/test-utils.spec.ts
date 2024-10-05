import {reflect, Reflector} from "../src";
import {LambdaSuperClass} from "./reflector/lambdas/LambdaSuperClass";

// TODO check get Methods from dust
describe("Reflector API Utils test", () => {

    it("test class info for primitives", () => {
        expect(() => Reflector.from({})).not.toThrow();
        expect(() => Reflector.from("" as never)).toThrow();
        expect(() => Reflector.from("xxx" as never)).toThrow();
        expect(() => Reflector.from([])).not.toThrow();
        expect(() => Reflector.from(0 as never)).toThrow();
        expect(() => Reflector.from(1 as never)).toThrow();
        expect(() => Reflector.from(undefined as never)).toThrow();
        expect(() => Reflector.from(null as never)).toThrow();
        expect(() => Reflector.from(false as never)).toThrow();
        expect(() => Reflector.from(true as never)).toThrow();
        expect(() => Reflector.from(Symbol.for("Symbol") as never)).toThrow();
        expect(() => Reflector.from(() => {
            void (0);
        })).not.toThrow();
    });

    it("test class info for object", () => {
        expect(() => Reflector.from({})).not.toThrow();

        expect(Reflector.from({}).getDecoratedConstructor()).toBeUndefined();
        expect(Reflector.from({}).getDecoratedAccessors().length).toBe(0);
        expect(Reflector.from({}).getDecoratedProperties().length).toBe(0);
        expect(Reflector.from({}).getDecoratedMethods().length).toBe(0);
    });

    it("test lambdas", () => {
        const reflector: Reflector = Reflector.from(LambdaSuperClass);
        expect(reflector.getProperty("lambdaStaticProperty", true).addDecorator(reflect())).toBeTruthy();
        expect(reflector.getProperty("lambdaProperty").addDecorator(reflect())).toBeTruthy();
    });
});

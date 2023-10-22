import {reflect, Reflector} from "../src";
import {LambdaSuperClass} from "./reflector/lambdas/LambdaSuperClass";

// TODO check get Methods from dust
describe("Reflector API Utils test", () => {

    it("test class info for primitives", () => {
        expect(() => Reflector.from({})).not.toThrowError();
        expect(() => Reflector.from("" as never)).toThrowError();
        expect(() => Reflector.from("xxx" as never)).toThrowError();
        expect(() => Reflector.from([])).not.toThrowError();
        expect(() => Reflector.from(0 as never)).toThrowError();
        expect(() => Reflector.from(1 as never)).toThrowError();
        expect(() => Reflector.from(undefined as never)).toThrowError();
        expect(() => Reflector.from(null as never)).toThrowError();
        expect(() => Reflector.from(false as never)).toThrowError();
        expect(() => Reflector.from(true as never)).toThrowError();
        expect(() => Reflector.from(Symbol.for("Symbol") as never)).toThrowError();
        expect(() => Reflector.from(() => {
            void (0);
        })).not.toThrowError();
    });

    it("test class info for object", () => {
        expect(() => Reflector.from({})).not.toThrowError();

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

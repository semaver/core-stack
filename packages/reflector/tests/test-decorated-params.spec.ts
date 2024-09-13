import {Reflector} from "../src";
import {
    ArgsChildClass,
    EmptyConstructorChildClass,
    SuperClass,
    WithCustomParameterOrderChildClass,
    WithSameParameterOrderChildClass
} from "./metatable/ownundknown/OwnAndKnownParameterClasses";

describe("Reflector Decorated Constructors tests", () => {

    it("test arg ", () => {
        const reflectorS0: Reflector<SuperClass> = Reflector.from(SuperClass);
        const reflectorC1: Reflector<WithSameParameterOrderChildClass> = Reflector.from(WithSameParameterOrderChildClass);
        const reflectorC2: Reflector<WithCustomParameterOrderChildClass> = Reflector.from(WithCustomParameterOrderChildClass);
        const reflectorC3: Reflector<ArgsChildClass> = Reflector.from(ArgsChildClass);
        const reflectorC4: Reflector<EmptyConstructorChildClass> = Reflector.from(EmptyConstructorChildClass);

        //---------------------------------------------------------------------------------

        expect(SuperClass.length).toBe(2);
        expect(WithSameParameterOrderChildClass.length).toBe(2);
        expect(WithCustomParameterOrderChildClass.length).toBe(2);
        expect(ArgsChildClass.length).toBe(0);
        expect(EmptyConstructorChildClass.length).toBe(0);

        expect(reflectorS0.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC1.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC2.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC1.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC2.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC4.getConstructor().getKnownParameterCount()).toBe(2);

    });

});

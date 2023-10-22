import {ConstructorParameter, MethodParameter, Reflector} from "../src";
import {
    ChildNonDecoratedArgConstructor1Class,
    ChildNonDecoratedArgConstructor2Class,
    ChildNonDecoratedArgConstructor3Class,
    ChildNonDecoratedArgConstructor4Class,
    SuperNonDecoratedArgConstructorClass
} from "./metatable/nondecorated/NonDecoratedSuperArgConstructorClasses";
import {
    ChildNonDecoratedEmptyConstructor1Class,
    ChildNonDecoratedEmptyConstructor2Class,
    ChildNonDecoratedEmptyConstructor3Class,
    ChildNonDecoratedEmptyConstructor4Class,
    SuperNonDecoratedEmptyConstructorClass
} from "./metatable/nondecorated/NonDecoratedSuperEmptyConstructorClasses";
import {
    ChildNonDecoratedParamConstructor1Class,
    ChildNonDecoratedParamConstructor2Class,
    ChildNonDecoratedParamConstructor3Class,
    ChildNonDecoratedParamConstructor4Class,
    SuperNonDecoratedParamConstructorClass
} from "./metatable/nondecorated/NonDecoratedSuperParamConstructorClasses";

describe("Reflector Non Decorated Constructors tests", () => {

    it("test arg ", () => {
        const reflectorS0: Reflector<SuperNonDecoratedArgConstructorClass> = Reflector.from(SuperNonDecoratedArgConstructorClass);
        const reflectorC1: Reflector<ChildNonDecoratedArgConstructor1Class> = Reflector.from(ChildNonDecoratedArgConstructor1Class);
        const reflectorC2: Reflector<ChildNonDecoratedArgConstructor2Class> = Reflector.from(ChildNonDecoratedArgConstructor2Class);
        const reflectorC3: Reflector<ChildNonDecoratedArgConstructor3Class> = Reflector.from(ChildNonDecoratedArgConstructor3Class);
        const reflectorC4: Reflector<ChildNonDecoratedArgConstructor4Class> = Reflector.from(ChildNonDecoratedArgConstructor4Class);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedArgConstructorClass.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor1Class.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor2Class.length).toBe(2);
        expect(ChildNonDecoratedArgConstructor3Class.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor4Class.length).toBe(0);

        expect(reflectorS0.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC1.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC1.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC2.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getKnownParameterCount()).toBe(0);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedArgConstructorClass.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor1Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor2Class.prototype.method.length).toBe(2);
        expect(ChildNonDecoratedArgConstructor3Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedArgConstructor4Class.prototype.method.length).toBe(0);

        expect(reflectorS0.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC1.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC1.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getKnownParameterCount()).toBe(0);
    });

    it("test empty ", () => {
        const reflectorS0: Reflector<SuperNonDecoratedEmptyConstructorClass> = Reflector.from(SuperNonDecoratedEmptyConstructorClass);
        const reflectorC1: Reflector<ChildNonDecoratedEmptyConstructor1Class> = Reflector.from(ChildNonDecoratedEmptyConstructor1Class);
        const reflectorC2: Reflector<ChildNonDecoratedEmptyConstructor2Class> = Reflector.from(ChildNonDecoratedEmptyConstructor2Class);
        const reflectorC3: Reflector<ChildNonDecoratedEmptyConstructor3Class> = Reflector.from(ChildNonDecoratedEmptyConstructor3Class);
        const reflectorC4: Reflector<ChildNonDecoratedEmptyConstructor4Class> = Reflector.from(ChildNonDecoratedEmptyConstructor4Class);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedEmptyConstructorClass.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor1Class.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor2Class.length).toBe(2);
        expect(ChildNonDecoratedEmptyConstructor3Class.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor4Class.length).toBe(0);

        expect(reflectorS0.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC1.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC1.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC2.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getKnownParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getKnownParameterCount()).toBe(0);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedEmptyConstructorClass.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor1Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor2Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor3Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedEmptyConstructor4Class.prototype.method.length).toBe(0);

        expect(reflectorS0.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC1.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC3.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC1.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC3.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getKnownParameterCount()).toBe(0);
    });

    it("test param ", () => {
        const reflectorS0: Reflector<SuperNonDecoratedParamConstructorClass> = Reflector.from(SuperNonDecoratedParamConstructorClass);
        const reflectorC1: Reflector<ChildNonDecoratedParamConstructor1Class> = Reflector.from(ChildNonDecoratedParamConstructor1Class);
        const reflectorC2: Reflector<ChildNonDecoratedParamConstructor2Class> = Reflector.from(ChildNonDecoratedParamConstructor2Class);
        const reflectorC3: Reflector<ChildNonDecoratedParamConstructor3Class> = Reflector.from(ChildNonDecoratedParamConstructor3Class);
        const reflectorC4: Reflector<ChildNonDecoratedParamConstructor4Class> = Reflector.from(ChildNonDecoratedParamConstructor4Class);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedParamConstructorClass.length).toBe(2);
        expect(ChildNonDecoratedParamConstructor1Class.length).toBe(0);
        expect(ChildNonDecoratedParamConstructor2Class.length).toBe(2);
        expect(ChildNonDecoratedParamConstructor3Class.length).toBe(0);
        expect(ChildNonDecoratedParamConstructor4Class.length).toBe(0);

        expect(reflectorS0.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC1.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getConstructor().getOwnParameterCount()).toBe(0);

        expect(reflectorS0.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC1.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC2.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorC4.getConstructor().getKnownParameterCount()).toBe(2);

        //---------------------------------------------------------------------------------

        expect(SuperNonDecoratedParamConstructorClass.prototype.method.length).toBe(2);
        expect(ChildNonDecoratedParamConstructor1Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedParamConstructor2Class.prototype.method.length).toBe(2);
        expect(ChildNonDecoratedParamConstructor3Class.prototype.method.length).toBe(0);
        expect(ChildNonDecoratedParamConstructor4Class.prototype.method.length).toBe(2);

        expect(reflectorS0.getMethod("method")?.getOwnParameterCount()).toBe(2);
        expect(reflectorC1.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getOwnParameterCount()).toBe(2);
        expect(reflectorC3.getMethod("method")?.getOwnParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getOwnParameterCount()).toBe(2);

        expect(reflectorS0.getMethod("method")?.getKnownParameterCount()).toBe(2);
        expect(reflectorC1.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC2.getMethod("method")?.getKnownParameterCount()).toBe(2);
        expect(reflectorC3.getMethod("method")?.getKnownParameterCount()).toBe(0);
        expect(reflectorC4.getMethod("method")?.getKnownParameterCount()).toBe(2);

    });

    it("test dedicated param ", () => {
        const reflectorS0: Reflector<SuperNonDecoratedParamConstructorClass> = Reflector.from(SuperNonDecoratedParamConstructorClass);

        expect(reflectorS0.getConstructor().getOwnParameterCount()).toBe(2);
        expect(reflectorS0.getConstructor().getKnownParameterCount()).toBe(2);
        expect(reflectorS0.getConstructor().getParameterAt(0)).toBeInstanceOf(ConstructorParameter);

        expect(reflectorS0.getMethod("method")?.getOwnParameterCount()).toBe(2);
        expect(reflectorS0.getMethod("method")?.getKnownParameterCount()).toBe(2);
        expect(reflectorS0.getMethod("method")?.getParameterAt(0)).toBeInstanceOf(MethodParameter);
    });
});

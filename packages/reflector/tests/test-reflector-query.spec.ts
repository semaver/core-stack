import {ClassMember, Reflector} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {testClassInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {EmbeddedSuperClass} from "./metatable/embedded/EmbeddedSuperClass";
import {EmptyClass} from "./metatable/classes/EmptyClass";
import {IClass} from "@semaver/core";

describe("Reflector API Queries", () => {

    beforeAll(() => {
        testClassInitialDescriptors(SuperReflectedClass);
    });

    it("test super reflected class members", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;
        const reflector: Reflector = Reflector.from(reflectedClass);

        const classMembers: ClassMember<SuperReflectedClass>[] = reflector.query().members().all();
        expect(classMembers.length).toBe(16);
    });

    it("test emptyCall child reflected class members", () => {
        const reflectedClass: IClass<SuperReflectedClass> = ChildEmptyReflectedClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedAccessors().length).toBe(3);
        expect(reflector.getDecoratedProperties().length).toBe(3);
        expect(reflector.getDecoratedFields().length).toBe(6);
        expect(reflector.getDecoratedConstructor()).toBeDefined();
        expect(reflector.getDecoratedMethods()).not.toBe(3);
    });

    it("test class members with constructor and 2 methods", () => {
        const reflectedClass: IClass<EmbeddedSuperClass> = EmbeddedSuperClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedAccessors().length).toBe(0);
        expect(reflector.getDecoratedProperties().length).toBe(0);
        expect(reflector.getDecoratedFields().length).toBe(0);
        expect(reflector.getDecoratedConstructor()).toBeDefined();
        expect(reflector.getDecoratedMethods()).not.toBe(2);
    });

    it("test emptyCall class members", () => {
        const reflectedClass: IClass<EmptyClass> = EmptyClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedAccessors().length).toBe(0);
        expect(reflector.getDecoratedProperties().length).toBe(0);
        expect(reflector.getDecoratedFields().length).toBe(0);
        expect(reflector.getDecoratedConstructor()).toBeUndefined();
        expect(reflector.getDecoratedMethods()).not.toBe(0);
    });

});

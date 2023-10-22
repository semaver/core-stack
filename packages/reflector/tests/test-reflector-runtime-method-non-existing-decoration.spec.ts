import {ByMemberName, reflect, Reflector} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test instance method runtime decoration in super with user defined static", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;
        const memberName: string = "runNormal_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getMethod(memberName)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test static method runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runStatic_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getMethod(memberName, true)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance method runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runNormal_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getMethod(memberName)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test static method runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "runStatic_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getMethod(memberName, true)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance method runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "runNormal_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getMethod(memberName)?.addDecorator(reflect())).toBeUndefined();
    });
});

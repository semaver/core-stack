import {ByMemberName, reflect, Reflector} from "../src";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test static NOT EXISTING accessor runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "accessorStaticFull_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getAccessor(memberName, true)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance NOT EXISTING accessor runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "accessorNormalFull_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getAccessor(memberName)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test static NOT EXISTING accessor runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "accessorStaticFull_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getAccessor(memberName, true)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance NOT EXISTING accessor runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "accessorNormalFull_";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getAccessor(memberName)?.addDecorator(reflect())).toBeUndefined();
    });
});

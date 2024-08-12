import {ByMemberName, ClassMember, reflect, ReflectDecorator, Reflector} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass, Nullable} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test instance method runtime decoration in super with user defined static", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const member: Nullable<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName)?.addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test static method runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runStatic";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const member: Nullable<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName, true)?.addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test instance method runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const member: Nullable<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName)?.addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test static method runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "runStatic";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);

        expect(reflector.getMethod(memberName, true)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance method runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const member: Nullable<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);

        reflector.getMethod(memberName)?.addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);
    });
});

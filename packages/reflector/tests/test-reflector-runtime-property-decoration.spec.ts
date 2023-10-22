import {ByMemberName, ClassMember, reflect, ReflectDecorator, Reflector} from "../src";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass, Nullable} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test static property runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "propertyUndefStatic";

        const reflector: Reflector = Reflector.from(reflectedClass, true);

        const member: Nullable<ClassMember<object>> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        reflector.getProperty(memberName, true).addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);
    });

    test("test instance property runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "propertyUndefNormal";

        const reflector: Reflector = Reflector.from(reflectedClass, true);

        const member: Nullable<ClassMember<object>> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        reflector.getProperty(memberName).addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);
    });

    test("test static property runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "propertyUndefStatic";

        const reflector: Reflector = Reflector.from(reflectedClass, true);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        reflector.getProperty(memberName, true).addDecorator(reflect());

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        const member: Nullable<ClassMember<object>> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(member?.getDecorators().length).toBe(0);
        expect(member?.getOwnDecorators().length).toBe(0);
    });

    test("test instance property runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "propertyUndefNormal";

        const reflector: Reflector = Reflector.from(reflectedClass, true);

        const member: Nullable<ClassMember<object>> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        reflector.getProperty(memberName, false).addDecorator(reflect());

        expect(member?.getDecorators().length).toBe(2);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        expect(member?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(member?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        member?.removeDecorator(ReflectDecorator);

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
    });
});

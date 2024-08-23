import {ByMemberName, ClassMember, reflect, ReflectDecorator, Reflector} from "../src";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass, Empty} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test instance accessor runtime decoration in full child with user defined static", () => {
            const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
            const memberName: string = "accessorNormalFull";

            const reflector: Reflector = Reflector.from(reflectedClass);

            const member: Empty<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

            expect(member?.getDecorators().length).toBe(1);
            expect(member?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

            reflector.getAccessor(memberName)?.addDecorator(reflect());

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
        },
    );

    test("test static accessor runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "accessorStaticFull";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const member: Empty<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

        expect(member?.getDecorators().length).toBe(1);
        expect(member?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        reflector.getAccessor(memberName, true)?.addDecorator(reflect());

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

    test("test static accessor runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "accessorStaticFull";

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(reflector.getAccessor(memberName, true)?.addDecorator(reflect())).toBeUndefined();
        },
    );

    test("test instance accessor runtime decoration in empty child with user defined static",
        () => {
            const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
            const memberName: string = "accessorNormalFull";

            const reflector: Reflector = Reflector.from(reflectedClass);

            const member: Empty<ClassMember> = reflector.query().filter(ByMemberName.from(memberName)).members().first();

            expect(member?.getDecorators().length).toBe(1);
            expect(member?.getOwnDecorators().length).toBe(0);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

            reflector.getAccessor(memberName)?.addDecorator(reflect());

            expect(member?.getDecorators().length).toBe(2);
            expect(member?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

            reflector.getAccessor(memberName)?.removeDecorator(ReflectDecorator);

            expect(member?.getDecorators().length).toBe(1);
            expect(member?.getOwnDecorators().length).toBe(0);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        },
    );
});

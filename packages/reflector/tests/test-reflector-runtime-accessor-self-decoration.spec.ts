import {Accessor, ByMemberName, Method, reflect, ReflectDecorator, Reflector} from "../src";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass, Nullable} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test static accessor runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = (ChildFullReflectedClass);
        const memberName: string = "accessorStaticFull";

        const reflector: Reflector = Reflector.from(reflectedClass);
        const accessor: Nullable<Accessor> = reflector.query().filter(ByMemberName.from(memberName)).members().first<Accessor>();

        expect(accessor?.getDecorators().length).toBe(1);
        expect(accessor?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        accessor?.addDecorator(reflect());

        expect(accessor?.getDecorators().length).toBe(2);
        expect(accessor?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);

        expect(accessor?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(accessor?.getOwnDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators(ReflectDecorator).length).toBe(1);

        accessor?.removeDecorator(ReflectDecorator);

        expect(accessor?.getDecorators().length).toBe(1);
        expect(accessor?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

    });

    test("test instance accessor runtime decoration in full child with user defined static", () => {
            const reflectedClass: IClass<ChildFullReflectedClass> = (ChildFullReflectedClass);
            const memberName: string = "accessorNormalFull";

        const reflector: Reflector = Reflector.from(reflectedClass);
        const method: Nullable<Method> = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method>();

            expect(method?.getDecorators().length).toBe(1);
            expect(method?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

            method?.addDecorator(reflect());

            expect(method?.getDecorators().length).toBe(2);
            expect(method?.getOwnDecorators().length).toBe(2);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(2);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);

            expect(method?.getDecorators(ReflectDecorator).length).toBe(1);
            expect(method?.getOwnDecorators(ReflectDecorator).length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators(ReflectDecorator).length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators(ReflectDecorator).length).toBe(1);

            method?.removeDecorator(ReflectDecorator);

            expect(method?.getDecorators().length).toBe(1);
            expect(method?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
            expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);
        },
    );

    test("test static accessor runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = (ChildEmptyReflectedClass);
        const memberName: string = "accessorStaticFull";

        const reflector: Reflector = Reflector.from(reflectedClass);
        const method: Nullable<Method> = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method>();

        expect(reflector.query().filter(ByMemberName.from(memberName)).members().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        expect(method?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance accessor runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = (ChildEmptyReflectedClass);
        const memberName: string = "accessorNormalFull";

        const reflector: Reflector = Reflector.from(reflectedClass);
        const method: Nullable<Method> = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method>();

        expect(method?.getDecorators().length).toBe(1);
        expect(method?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);

        method?.addDecorator(reflect());

        expect(method?.getDecorators().length).toBe(2);
        expect(method?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);

        method?.removeDecorator(ReflectDecorator);

        expect(method?.getDecorators().length).toBe(1);
        expect(method?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).members().first()?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
    });
});

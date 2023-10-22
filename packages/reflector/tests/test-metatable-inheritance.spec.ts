import {ChildDecoratedClass} from "./metatable/classes/ChildDecoratedClass";
import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testOwnDecorators} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";
import {IClass} from "@semaver/core";
import {InheritanceSuperClass} from "./metatable/classes/InheritanceSuperClass";
import {InheritanceChildClass} from "./metatable/classes/InheritanceChildClass";
import {InheritanceChildOfChildClass} from "./metatable/classes/InheritanceChildOfChildClass";
import {ByMemberName, Method, reflect, ReflectDecorator, Reflector} from "../src";

describe("Reflector API inheritance 1 Test", () => {

    beforeAll(() => {
        testSuperAndChildInitialDescriptors(InheritanceSuperClass, InheritanceChildClass);
        testSuperAndChildInitialDescriptors(InheritanceChildClass, InheritanceChildOfChildClass);
    });

    it("test members count", () => {
        testOwnDecorators(ChildDecoratedClass, 0, 1, 1, 1, 1);
        testQueries(ChildDecoratedClass, 3, 4, 1, 1, 3, 1, 4);
    });

    it("metatable cache check and inheritance for full static accessor", () => {
        const memberName: string = "accessorStaticFull";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.removeDecorator(ReflectDecorator);
    });

    it("metatable cache check and inheritance for get static accessor", () => {
        const memberName: string = "accessorStaticGet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.removeDecorator(ReflectDecorator);
    });

    it("metatable cache check and inheritance for set static accessor", () => {
        const memberName: string = "accessorStaticSet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getAccessor(memberName, true)?.removeDecorator(ReflectDecorator);
    });

    test(
        "metatable cache check and inheritance for full instance accessor",
        () => {
            const memberName: string = "accessorNormalFull";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

            superInfo.getAccessor(memberName)?.addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

            superInfo.getAccessor(memberName)?.removeDecorator(ReflectDecorator);
        },
    );

    it("metatable cache check and inheritance for get instance accessor", () => {
        const memberName: string = "accessorNormalGet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

        superInfo.getAccessor(memberName)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

        superInfo.getAccessor(memberName)?.removeDecorator(ReflectDecorator);
    });

    it("metatable cache check and inheritance for set instance accessor", () => {
        const memberName: string = "accessorNormalSet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

        superInfo.getAccessor(memberName)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

        superInfo.getAccessor(memberName)?.removeDecorator(ReflectDecorator);
    });

    test(
        "metatable cache check and inheritance for set static undefined property",
        () => {
            const memberName: string = "propertyUndefStatic";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getProperty(memberName, true).addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getProperty(memberName, true).removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for set static defined property",
        () => {
            const memberName: string = "propertyDefStatic";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getProperty(memberName, true).addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getProperty(memberName, true).removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for set instance undefined property",
        () => {
            const memberName: string = "propertyUndefNormal";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

            superInfo.getProperty(memberName).addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

            superInfo.getProperty(memberName).removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for set instance defined property",
        () => {
            const memberName: string = "propertyDefNormal";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

            superInfo.getProperty(memberName).addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

            superInfo.getProperty(memberName).removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for set instance null property",
        () => {
            const memberName: string = "propertyNullNormal";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);

            superInfo.getProperty(memberName).addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);

            superInfo.getProperty(memberName).removeDecorator(ReflectDecorator);
        },
    );

    it("metatable cache check and inheritance for static method", () => {
        const memberName: string = "runStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getMethod(memberName, true)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

        superInfo.getMethod(memberName, true)?.removeDecorator(ReflectDecorator);
    });

    test(
        "metatable cache check and inheritance for static method parameters",
        () => {
            const memberName: string = "runStatic";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getMethod(memberName, true)?.getParameterAt(0)?.addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()).toBeUndefined();

            superInfo.getMethod(memberName, true)?.getParameterAt(0)?.removeDecorator(ReflectDecorator);
        },
    );

    it("metatable cache check and inheritance for instance method", () => {
        const memberName: string = "runNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);

        superInfo.getMethod(memberName)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(2);
        expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);

        superInfo.getMethod(memberName)?.removeDecorator(ReflectDecorator);
    });

    test(
        "metatable cache check and inheritance for instance method parameter",
        () => {
            const memberName: string = "runNormal";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);

            superInfo.getMethod(memberName)?.getParameterAt(0)?.addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);

            superInfo.getMethod(memberName)?.getParameterAt(0)?.removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for instance method default parameter ",
        () => {
            const memberName: string = "runNormalWith1DefaultParam";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(0);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(0);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(0);

            superInfo.getMethod(memberName)?.getParameterAt(1)?.addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(1)?.getDecorators().length).toBe(1);

            superInfo.getMethod(memberName)?.getParameterAt(1)?.removeDecorator(ReflectDecorator);
        },
    );

    test(
        "metatable cache check and inheritance for instance none decorated method parameter ",
        () => {
            const memberName: string = "runNonDecoratedNormalWith1Param";

            const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
            const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
            const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

            let superInfo: Reflector = Reflector.from(superClass);
            let childInfo: Reflector = Reflector.from(childClass);
            let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(1);

            superInfo.getMethod(memberName)?.getParameterAt(0)?.addDecorator(reflect());

            superInfo = Reflector.from(superClass);
            childInfo = Reflector.from(childClass);
            childOfChildInfo = Reflector.from(childOfChildClass);

            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(superInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceSuperClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(childInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first()?.getDecorators().length).toBe(0);
            expect(childOfChildInfo.query().filter(ByMemberName.from(memberName)).members().first<Method<InheritanceChildOfChildClass>>()?.getParameterAt(0)?.getDecorators().length).toBe(2);

            superInfo.getMethod(memberName)?.getParameterAt(0)?.removeDecorator(ReflectDecorator);
        },
    );

    it("metatable cache check and inheritance for constructor ", () => {
        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(superInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);

        superInfo.getDecoratedConstructor()?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.getDecoratedConstructor()?.getDecorators().length).toBe(2);
        expect(superInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getDecorators().length).toBe(2);
        expect(childInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getDecorators().length).toBe(2);
        expect(childOfChildInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);

        superInfo.getDecoratedConstructor()?.removeDecorator(ReflectDecorator);

    });

    it("metatable cache check and inheritance for constructor parameters", () => {
        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        let superInfo: Reflector = Reflector.from(superClass);
        let childInfo: Reflector = Reflector.from(childClass);
        let childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(superInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);

        superInfo.getDecoratedConstructor()?.getParameterAt(0)?.addDecorator(reflect());

        superInfo = Reflector.from(superClass);
        childInfo = Reflector.from(childClass);
        childOfChildInfo = Reflector.from(childOfChildClass);

        expect(superInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(superInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);
        expect(childInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);
        expect(childOfChildInfo.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);

        superInfo.getDecoratedConstructor()?.getParameterAt(0)?.removeDecorator(ReflectDecorator);
    });
});

import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testAllDescriptors, testOwnDecorators} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";
import {OwnSuperClass} from "./reflector/own/OwnSuperClass";
import {OwnChildClass} from "./reflector/own/OwnChildClass";
import {Accessor, ByMemberName, ByMemberType, ClassMember, DecoratedElementEnum, Reflector} from "../src";
import {Empty} from "@semaver/core";

describe("Reflector API Basic Members Test", () => {

    it("before test of own", () => {
        testSuperAndChildInitialDescriptors(OwnSuperClass, OwnChildClass);

        testOwnDecorators(OwnSuperClass, 1, 0, 0, 1, 1);
        testQueries(OwnSuperClass, 1, 0, 0, 1, 1, 0, 0);
        testAllDescriptors(OwnSuperClass, 1, 0, 0, 1, 1);

        testOwnDecorators(OwnChildClass, 2, 0, 0, 0, 0);
        testQueries(OwnChildClass, 2, 0, 0, 1, 1, 0, 0);
        testAllDescriptors(OwnChildClass, 2, 0, 0, 1, 1);

    });

    it("test own constructor", () => {

        const superInfo: Reflector<OwnSuperClass> = Reflector.from(OwnSuperClass);
        const childInfo: Reflector<OwnSuperClass> = Reflector.from(OwnChildClass);

        const superMember: Empty<ClassMember<OwnSuperClass>> = superInfo
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .members()
            .first();

        const childMember: Empty<ClassMember<OwnSuperClass>> = childInfo
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .members()
            .first();

        expect(superMember).toBeDefined();
        expect(superMember?.hasDecorators()).toBe(true);
        expect(superMember?.hasOwnDecorators()).toBe(true);

        expect(childMember).toBeDefined();
        expect(childMember?.hasDecorators()).toBe(true);
        expect(childMember?.hasOwnDecorators()).toBe(false);

    });

    it("test own getters/setters get - super, set - child", () => {

        const superInfo: Reflector<OwnSuperClass> = Reflector.from(OwnSuperClass);
        const childInfo: Reflector<OwnSuperClass> = Reflector.from(OwnChildClass);
        const accessorName: string = "accessor1";

        const superAccessor: Empty<Accessor<OwnSuperClass>> = superInfo
            .query()
            .filter(ByMemberName.from(accessorName))
            .members()
            .first<Accessor<OwnSuperClass>>();

        const childAccessor: Empty<Accessor<OwnSuperClass>> = childInfo
            .query()
            .filter(ByMemberName.from(accessorName))
            .members()
            .first<Accessor<OwnSuperClass>>();

        expect(superAccessor).toBeDefined();
        expect(superAccessor?.isGettable()).toBe(true);
        expect(superAccessor?.isSettable()).toBe(false);
        expect(superAccessor?.hasDecorators()).toBe(true);
        expect(superAccessor?.hasOwnDecorators()).toBe(true);
        expect(superAccessor?.getDecorators().length).toBe(1);
        expect(superAccessor?.getOwnDecorators().length).toBe(1);

        expect(childAccessor).toBeDefined();
        expect(childAccessor?.isGettable()).toBe(true);
        expect(childAccessor?.isSettable()).toBe(true);
        expect(childAccessor?.hasDecorators()).toBe(true);
        expect(childAccessor?.hasOwnDecorators()).toBe(true);
        expect(childAccessor?.getDecorators().length).toBe(1);
        expect(childAccessor?.getOwnDecorators().length).toBe(1);
    });

    it("test own getters/setters get - child, set - super", () => {

        const superInfo: Reflector<OwnSuperClass> = Reflector.from(OwnSuperClass);
        const childInfo: Reflector<OwnSuperClass> = Reflector.from(OwnChildClass);
        const accessorName: string = "accessor2";

        const superAccessor: Empty<Accessor<OwnSuperClass>> = superInfo
            .query()
            .filter(ByMemberName.from(accessorName))
            .members()
            .first<Accessor<OwnSuperClass>>();

        const childAccessor: Empty<Accessor<OwnSuperClass>> = childInfo
            .query()
            .filter(ByMemberName.from(accessorName))
            .members()
            .first<Accessor<OwnSuperClass>>();

        expect(superAccessor).toBeUndefined();

        expect(childAccessor).toBeDefined();
        expect(childAccessor?.isGettable()).toBe(true);
        expect(childAccessor?.isSettable()).toBe(true);
        expect(childAccessor?.hasDecorators()).toBe(true);
        expect(childAccessor?.hasOwnDecorators()).toBe(true);
        expect(childAccessor?.getDecorators().length).toBe(1);
        expect(childAccessor?.getOwnDecorators().length).toBe(1);
    });

});

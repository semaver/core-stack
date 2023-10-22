import {IClass} from "@semaver/core";
import {InheritanceSuperClass} from "./metatable/classes/InheritanceSuperClass";
import {InheritanceChildClass} from "./metatable/classes/InheritanceChildClass";
import {InheritanceChildOfChildClass} from "./metatable/classes/InheritanceChildOfChildClass";
import {Reflector} from "../src";

describe("Class Info API Test", () => {

    it("members check and inheritance for full static accessor", () => {
        const memberName: string = "accessorStaticFull";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, true)).toBeDefined();
        expect(childInfo.getAccessor(memberName, true)).toBeUndefined();
        expect(childOfChildInfo.getAccessor(memberName, true)).toBeUndefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();
    });

    it("members check and inheritance for get static accessor", () => {
        const memberName: string = "accessorStaticGet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, true)).toBeDefined();
        expect(childInfo.getAccessor(memberName, true)).toBeUndefined();
        expect(childOfChildInfo.getAccessor(memberName, true)).toBeUndefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();

    });

    it("members check and inheritance for set static accessor", () => {
        const memberName: string = "accessorStaticSet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, true)).toBeDefined();
        expect(childInfo.getAccessor(memberName, true)).toBeUndefined();
        expect(childOfChildInfo.getAccessor(memberName, true)).toBeUndefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();

    });

    it("members check and inheritance for full instance accessor", () => {
        const memberName: string = "accessorNormalFull";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getAccessor(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for get instance accessor", () => {
        const memberName: string = "accessorNormalGet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getAccessor(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for set instance accessor", () => {
        const memberName: string = "accessorNormalSet";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childInfo.getAccessor(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getAccessor(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for set static undefined decorated property", () => {
        const memberName: string = "propertyUndefStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, true)).toBeDefined();
        expect(childInfo.getProperty(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, true)).toBeDefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();

    });

    test("members check and inheritance for set static undefined none decorated property", () => {
        const memberName: string = "propertyUndefNonDecoratedStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, true)).toBeDefined();
        expect(childInfo.getProperty(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, true)).toBeDefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();
    });

    test("members check and inheritance for set static defined none decorated property", () => {
        const memberName: string = "propertyDefNonDecoratedStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, true)).toBeDefined();
        expect(childInfo.getProperty(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, true)).toBeDefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();

    });

    it("members check and inheritance for set static defined property", () => {
        const memberName: string = "propertyDefStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, true)).toBeDefined();
        expect(childInfo.getProperty(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, true)).toBeDefined();

        expect(superInfo.getField(memberName, true)).toBeDefined();
        expect(childInfo.getField(memberName, true)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, true)).toBeDefined();

    });

    test("members check and inheritance for set instance undefined decorated property", () => {
        const memberName: string = "propertyUndefNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for set instance undefined none decorated property", () => {
        const memberName: string = "propertyUndefNonDecoratedNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for set instance defined property", () => {
        const memberName: string = "propertyDefNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for set instance defined none decorated property", () => {
        const memberName: string = "propertyDefNonDecoratedNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for set instance null property", () => {
        const memberName: string = "propertyNullNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for set instance null none decorated property", () => {
        const memberName: string = "propertyNullNonDecoratedNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getProperty(memberName, false)).toBeDefined();
        expect(childInfo.getProperty(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getProperty(memberName, false)).toBeDefined();

        expect(superInfo.getField(memberName, false)).toBeDefined();
        expect(childInfo.getField(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getField(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for static method", () => {
        const memberName: string = "runStatic";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getMethod(memberName, true)).toBeDefined();
        expect(childInfo.getMethod(memberName, true)).toBeUndefined();
        expect(childOfChildInfo.getMethod(memberName, true)).toBeUndefined();

    });

    it("members check and inheritance for instance method", () => {
        const memberName: string = "runNormal";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getMethod(memberName, false)).toBeDefined();
        expect(childInfo.getMethod(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getMethod(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for instance method default parameter ", () => {
        const memberName: string = "runNormalWith1DefaultParam";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getMethod(memberName, false)).toBeDefined();
        expect(childInfo.getMethod(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getMethod(memberName, false)).toBeDefined();

    });

    test("members check and inheritance for instance none decorated method parameter ", () => {
        const memberName: string = "runNonDecoratedNormalWith1Param";

        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getMethod(memberName, false)).toBeDefined();
        expect(childInfo.getMethod(memberName, false)).toBeDefined();
        expect(childOfChildInfo.getMethod(memberName, false)).toBeDefined();

    });

    it("members check and inheritance for constructor ", () => {
        const superClass: IClass<InheritanceSuperClass> = InheritanceSuperClass;
        const childClass: IClass<InheritanceChildClass> = InheritanceChildClass;
        const childOfChildClass: IClass<InheritanceChildOfChildClass> = InheritanceChildOfChildClass;

        const superInfo: Reflector = Reflector.from(superClass);
        const childInfo: Reflector = Reflector.from(childClass);
        const childOfChildInfo: Reflector = Reflector.from(childOfChildClass);

        expect(superInfo.getDecoratedConstructor()?.getKnownParameterCount()).toBe(1);
        expect(childInfo.getDecoratedConstructor()?.getKnownParameterCount()).toBe(1);
        expect(childOfChildInfo.getDecoratedConstructor()?.getKnownParameterCount()).toBe(1);

        expect(superInfo.getConstructor().getKnownParameterCount()).toBe(1);
        expect(childInfo.getConstructor().getKnownParameterCount()).toBe(1);
        expect(childOfChildInfo.getConstructor().getKnownParameterCount()).toBe(1);

        expect(superInfo.getConstructor().getOwnParameterCount()).toBe(1);
        expect(childInfo.getConstructor().getOwnParameterCount()).toBe(0);
        expect(childOfChildInfo.getConstructor().getOwnParameterCount()).toBe(0);

    });
});

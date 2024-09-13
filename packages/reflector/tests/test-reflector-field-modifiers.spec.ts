import {Accessor, ByMemberName, ByStaticMember, Property, Reflector} from "../src";
import {SuperDecoratedClass} from "./metatable/classes/SuperDecoratedClass";
import {Empty} from "@semaver/core";

describe("Reflector API FieldModifiers", () => {

    it("test static full accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorStaticFull: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorStaticFull"))
            .filter(ByStaticMember.from(true))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        expect(accessorStaticFull).toBeDefined();
        expect(accessorStaticFull?.isGettable()).toBe(true);
        expect(accessorStaticFull?.isSettable()).toBe(true);

        expect(accessorStaticFull?.getValue(SuperDecoratedClass)).toBe("");

        accessorStaticFull?.setValue(SuperDecoratedClass, "accessorStaticFull");
        expect(accessorStaticFull?.getValue(SuperDecoratedClass)).toBe("accessorStaticFull");

    });

    it("test static get accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorStaticGet: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorStaticGet"))
            .filter(ByStaticMember.from(true))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        expect(accessorStaticGet).toBeDefined();
        expect(accessorStaticGet?.isGettable()).toBe(true);
        expect(accessorStaticGet?.isSettable()).toBe(false);

        expect(accessorStaticGet?.getValue(SuperDecoratedClass)).toBe("accessorStaticGet");

        expect(() => accessorStaticGet?.setValue(SuperDecoratedClass, "accessorStaticGet")).toThrowError();

    });

    it("test static set accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorStaticSet: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorStaticSet"))
            .filter(ByStaticMember.from(true))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        expect(accessorStaticSet).toBeDefined();
        expect(accessorStaticSet?.isGettable()).toBe(false);
        expect(accessorStaticSet?.isSettable()).toBe(true);

        expect(() => accessorStaticSet?.getValue(SuperDecoratedClass)).toThrowError();
        expect(() => accessorStaticSet?.setValue(SuperDecoratedClass, "accessorStaticSet")).not.toThrowError();

    });

    it("test instance full accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorNormalFull: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorNormalFull"))
            .filter(ByStaticMember.from(false))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        const instance: SuperDecoratedClass = new SuperDecoratedClass();

        expect(accessorNormalFull).toBeDefined();
        expect(accessorNormalFull?.isGettable()).toBe(true);
        expect(accessorNormalFull?.isSettable()).toBe(true);

        expect(() => accessorNormalFull?.getValue(undefined as never)).toThrowError();
        expect(() => accessorNormalFull?.setValue(undefined as never, "accessorNormalFull")).toThrowError();

        expect(accessorNormalFull?.getValue(instance)).toBe("");
        accessorNormalFull?.setValue(instance, "accessorNormalFull");
        expect(accessorNormalFull?.getValue(instance)).toBe("accessorNormalFull");

    });

    it("test instance get accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorNormalGet: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorNormalGet"))
            .filter(ByStaticMember.from(false))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        const instance: SuperDecoratedClass = new SuperDecoratedClass();

        expect(accessorNormalGet).toBeDefined();
        expect(accessorNormalGet?.isGettable()).toBe(true);
        expect(accessorNormalGet?.isSettable()).toBe(false);

        expect(() => accessorNormalGet?.getValue(undefined as never)).toThrowError();

        expect(accessorNormalGet?.getValue(instance)).toBe("accessorNormalGet");
        expect(() => accessorNormalGet?.setValue(instance, "accessorNormalGet")).toThrowError();

    });

    it("test instance set accessor modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const accessorNormalSet: Empty<Accessor<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("accessorNormalSet"))
            .filter(ByStaticMember.from(false))
            .members()
            .first<Accessor<SuperDecoratedClass>>();

        const instance: SuperDecoratedClass = new SuperDecoratedClass();

        expect(accessorNormalSet).toBeDefined();
        expect(accessorNormalSet?.isGettable()).toBe(false);
        expect(accessorNormalSet?.isSettable()).toBe(true);

        expect(() => accessorNormalSet?.getValue(undefined as never)).toThrowError();
        expect(() => accessorNormalSet?.setValue(undefined as never, "accessorNormalSet")).toThrowError();

        expect(() => accessorNormalSet?.getValue(instance)).toThrowError();
        expect(() => accessorNormalSet?.setValue(instance, "accessorNormalSet")).not.toThrowError();

    });

    it("test static property modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const propertyUndefStatic: Empty<Property<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("propertyUndefStatic"))
            .filter(ByStaticMember.from(true))
            .members()
            .first<Property<SuperDecoratedClass>>();

        expect(propertyUndefStatic).toBeDefined();
        expect(propertyUndefStatic?.isGettable()).toBe(true);
        expect(propertyUndefStatic?.isSettable()).toBe(true);

        expect(propertyUndefStatic?.getValue(SuperDecoratedClass)).toBeUndefined();

        propertyUndefStatic?.setValue(SuperDecoratedClass, 1);
        expect(propertyUndefStatic?.getValue(SuperDecoratedClass)).toBe(1);

        propertyUndefStatic?.setValue(SuperDecoratedClass, 1);
        expect(propertyUndefStatic?.getValue(SuperDecoratedClass)).toBe(1);

    });

    it("test instance property modifiers", () => {
        const reflector: Reflector<SuperDecoratedClass> = Reflector.from(SuperDecoratedClass);

        const propertyUndefNormal: Empty<Property<SuperDecoratedClass>> = reflector
            .query()
            .filter(ByMemberName.from("propertyUndefNormal"))
            .filter(ByStaticMember.from(false))
            .members()
            .first<Property<SuperDecoratedClass>>();

        const instance: SuperDecoratedClass = new SuperDecoratedClass();

        expect(propertyUndefNormal).toBeDefined();
        expect(propertyUndefNormal?.isGettable()).toBe(true);
        expect(propertyUndefNormal?.isSettable()).toBe(true);

        expect(() => propertyUndefNormal?.getValue(undefined as never)).toThrowError();
        expect(() => propertyUndefNormal?.setValue(undefined as never, 10)).toThrowError();

        expect(propertyUndefNormal?.getValue(instance)).toBeUndefined();
        propertyUndefNormal?.setValue(instance, 1);
        expect(propertyUndefNormal?.getValue(instance)).toBe(1);

        propertyUndefNormal?.setValue(instance, 1);
        expect(propertyUndefNormal?.getValue(instance)).toBe(1);

    });

});

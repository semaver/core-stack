import {ByMemberName, Method, Parameter, reflect, ReflectDecorator, Reflector} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {ChildFullReflectedClass} from "./reflector/classes/ChildFullReflectedClass";
import {IClass, Nullable} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    test("test instance method arguments runtime decoration in super with user defined static", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const parameter: Nullable<Parameter<object>> = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method<object>>()?.getParameterAt(0);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName)?.getParameterAt(0)?.addDecorator(reflect());

        expect(parameter?.getDecorators().length).toBe(2);
        expect(parameter?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(2);

        expect(parameter?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(parameter?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        parameter?.removeDecorator(ReflectDecorator);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test static method arguments runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runStatic";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const parameter: Nullable<Parameter<object>> | undefined = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method<object>>()?.getParameterAt(0);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName, true)?.getParameterAt(0)?.addDecorator(reflect());

        expect(parameter?.getDecorators().length).toBe(2);
        expect(parameter?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(2);

        expect(parameter?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(parameter?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        parameter?.removeDecorator(ReflectDecorator);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test instance method arguments runtime decoration in full child with user defined static", () => {
        const reflectedClass: IClass<ChildFullReflectedClass> = ChildFullReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const parameter: Nullable<Parameter<object>> | undefined = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method<object>>()?.getParameterAt(0);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getMethod(memberName)?.getParameterAt(0)?.addDecorator(reflect());

        expect(parameter?.getDecorators().length).toBe(2);
        expect(parameter?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(2);

        expect(parameter?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(parameter?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        parameter?.removeDecorator(ReflectDecorator);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test static method arguments runtime decoration in empty child with user defined static", () => {
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
        expect(reflector.getMethod(memberName, true)?.getParameterAt(0)?.addDecorator(reflect())).toBeUndefined();
    });

    test("test instance method arguments runtime decoration in empty child with user defined static", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;
        const memberName: string = "runNormal";

        const reflector: Reflector = Reflector.from(reflectedClass);

        const parameter: Nullable<Parameter<object>> | undefined = reflector.query().filter(ByMemberName.from(memberName)).members().first<Method<object>>()?.getParameterAt(0);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);

        reflector.getMethod(memberName)?.getParameterAt(0)?.addDecorator(reflect());

        expect(parameter?.getDecorators().length).toBe(2);
        expect(parameter?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(1);

        expect(parameter?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(parameter?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        parameter?.removeDecorator(ReflectDecorator);

        expect(parameter?.getDecorators().length).toBe(1);
        expect(parameter?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberName.from(memberName)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberName.from(memberName)).ownDecorators().ofParameters().length).toBe(0);
    });
});

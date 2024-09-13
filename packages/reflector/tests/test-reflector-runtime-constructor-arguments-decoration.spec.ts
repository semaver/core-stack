import {ByMemberType, DecoratedElementEnum, reflect, ReflectDecorator, Reflector} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {IClass} from "@semaver/core";
import {SuperEmptyClass} from "./reflector/classes/SuperEmptyClass";
import {SuperMinClass} from "./reflector/classes/SuperMinClass";
import {SuperMin2Class} from "./reflector/classes/SuperMin2Class";

describe("Reflector API Runtime decoration Test", () => {

    it("test constructor runtime decoration in super", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getOwnParameterCount()).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getKnownParameterCount()).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.addDecorator(reflect());

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(2);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.removeDecorator(ReflectDecorator);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

    });

    it("test constructor runtime decoration in empty child", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getOwnParameterCount()).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getKnownParameterCount()).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(0);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.addDecorator(reflect());

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(3);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.removeDecorator(ReflectDecorator);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(0);
    });

    it("test constructor runtime decoration in empty super", () => {
        const reflectedClass: IClass<SuperEmptyClass> = SuperEmptyClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()).toBeUndefined();
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(0);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.addDecorator(reflect())).toBeUndefined();

        expect(reflector.getDecoratedConstructor()).toBeUndefined();
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(0);
    });

    it("test constructor runtime decoration in mini super", () => {
        const reflectedClass: IClass<SuperMinClass> = SuperMinClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.addDecorator(reflect());

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(2);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(0)?.removeDecorator(ReflectDecorator);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);
    });

    it("test constructor runtime decoration in mini2 super", () => {

        const reflectedClass: IClass<SuperMin2Class> = SuperMin2Class;
        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators().length).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(1)?.addDecorator(reflect());

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getOwnDecorators().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(2);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        reflector.getDecoratedConstructor()?.getParameterAt(1)?.removeDecorator(ReflectDecorator);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);
    });

    test("test constructor runtime decoration in mini2 super none existing arg", () => {
        const reflectedClass: IClass<SuperMin2Class> = SuperMin2Class;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators().length).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getOwnDecorators().length).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(2)).toBeUndefined();
        expect(reflector.getDecoratedConstructor()?.getKnownParameterCount()).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);

        expect(reflector.getDecoratedConstructor()?.getParameterAt(2)?.removeDecorator(ReflectDecorator)).toBeUndefined();

        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(0)?.getOwnDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getDecorators().length).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(1)?.getOwnDecorators().length).toBe(0);
        expect(reflector.getDecoratedConstructor()?.getParameterAt(2)).toBeUndefined();
        expect(reflector.getDecoratedConstructor()?.getKnownParameterCount()).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(1);
    });
});

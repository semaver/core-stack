import {ByMemberType, DecoratedElementEnum, reflect, ReflectDecorator, Reflector} from "../src";
import {ChildEmptyReflectedClass} from "./reflector/classes/ChildEmptyReflectedClass";
import {IClass} from "@semaver/core";

describe("Reflector API Runtime decoration Test", () => {

    it("test constructor runtime decoration in empty child", () => {
        const reflectedClass: IClass<ChildEmptyReflectedClass> = ChildEmptyReflectedClass;

        const reflector: Reflector = Reflector.from(reflectedClass);

        expect(reflector.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getOwnDecorators().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().all().length).toBe(2);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().all().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofMembers().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofMembers().length).toBe(0);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(1);
        expect(reflector.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).ownDecorators().ofParameters().length).toBe(0);

        reflector.getDecoratedConstructor()?.addDecorator(reflect());

        expect(reflector.getDecoratedConstructor()?.getDecorators().length).toBe(2);
        expect(reflector.getDecoratedConstructor()?.getOwnDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getDecorators(ReflectDecorator).length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getOwnDecorators(ReflectDecorator).length).toBe(1);

        reflector.getDecoratedConstructor()?.removeDecorator(ReflectDecorator);

        expect(reflector.getDecoratedConstructor()?.getDecorators().length).toBe(1);
        expect(reflector.getDecoratedConstructor()?.getOwnDecorators().length).toBe(0);
    });
});

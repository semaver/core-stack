import {
    ByDecoratorClass,
    ByMemberDecoratorClass,
    ByMemberType,
    ByParameterDecoratorClass,
    ClassMember,
    DecoratedElementEnum,
    Reflector,
} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";
import {testClassInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {SuperMinClass} from "./reflector/classes/SuperMinClass";
import {StandardDecorator} from "./common/metadata/StandardDecorator";
import {IClass, Nullable} from "@semaver/core";

describe("Reflector API Queries Arguments", () => {

    beforeAll(() => {
        testClassInitialDescriptors(SuperReflectedClass);
    });

    it("test super reflected class arguments 1", () => {
        const reflectedClass: IClass<SuperReflectedClass> = SuperReflectedClass;
        const reflector: Reflector = Reflector.from(reflectedClass);

        let classMembers: ClassMember<SuperReflectedClass>[];

        classMembers = reflector.query().members().all();
        expect(classMembers.length).toBe(16);

        classMembers = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByMemberDecoratorClass.from(StandardDecorator))
            .members().all();

        const classMemberOne: Nullable<ClassMember<SuperReflectedClass>> = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByMemberDecoratorClass.from(StandardDecorator))
            .members().first();

        expect(classMembers.length).toBe(1);
        expect(classMemberOne).toBeDefined();
    });

    it("test super reflected class arguments 2", () => {
        const reflectedClass: IClass<SuperMinClass> = SuperMinClass;
        const reflector: Reflector = Reflector.from(reflectedClass);

        let classMembers: ClassMember<SuperMinClass>[];
        let classMemberOne: Nullable<ClassMember<SuperMinClass>>;

        classMembers = reflector.query().members().all();
        expect(classMembers.length).toBe(1);

        classMembers = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByMemberDecoratorClass.from(StandardDecorator))
            .members().all();

        classMemberOne = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByMemberDecoratorClass.from(StandardDecorator))
            .members().first();

        expect(classMembers.length).toBe(0);
        expect(classMemberOne).toBeUndefined();

        classMembers = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByDecoratorClass.from(StandardDecorator))
            .members().all();

        classMemberOne = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByDecoratorClass.from(StandardDecorator))
            .members().first();

        expect(classMembers.length).toBe(1);
        expect(classMemberOne).toBeDefined();

        classMembers = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByParameterDecoratorClass.from(StandardDecorator))
            .members().all();

        classMemberOne = reflector
            .query()
            .filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR))
            .filter(ByParameterDecoratorClass.from(StandardDecorator))
            .members().first();

        expect(classMembers.length).toBe(1);
        expect(classMemberOne).toBeDefined();
    });
});

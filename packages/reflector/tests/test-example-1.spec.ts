import {
    ByDecoratorClass,
    Decorator,
    Field,
    IClassTable,
    IDecoratedElement,
    metaclass,
    Method,
    Parameter,
    Reflector
} from "../src";
import {ThirdPartyClass} from "./example_1/ThirdPartyClass";
import {BaseClass} from "./example_1/BaseClass";
import {ChildClass} from "./example_1/ChildClass";
import {AnotherChildClass} from "./example_1/AnotherChildClass";
import {IClass, IType, Empty, throwError} from "@semaver/core";
import {
    DependencyId,
    InjectDecorator,
    NamedDecorator,
    OptionalDecorator,
    PostConstructDecorator,
    PreDestroyDecorator
} from "./example_1/decorators";
import {SomeType} from "./example_1/SomeType";
import {AnotherTypeInterface} from "./example_1/AnotherTypeInterface";

interface InjectionInfo<T extends IDecoratedElement> {
    type: IType<object>;
    named?: DependencyId;
    optional?: boolean;
    classMember: T;

}

interface MetaInfo {
    decoratedClass: IClass<object>,
    constructorParameters: InjectionInfo<Parameter>[],
    fields: Record<string, InjectionInfo<Field>>,
    postConstructs: Method[],
    preDestroys: Method[],
}

describe("Reflector Example 1 tests", () => {

    it("test the flow ", () => {
        // import classes
        void ThirdPartyClass;
        void BaseClass;
        void ChildClass;
        void AnotherChildClass;

        const proceedDecoratedClass = (decoratedClass: IClass<object>): MetaInfo => {
            const metaInfo: MetaInfo = {
                decoratedClass: decoratedClass,
                constructorParameters: [],
                fields: {},
                postConstructs: [],
                preDestroys: [],
            };
            const reflector: Reflector = Reflector.from(decoratedClass);
            reflector.getConstructor().getParameters().forEach((parameter) => {
                if (parameter.hasDecorators(InjectDecorator)) {
                    const injectDecorators: readonly Decorator[] = parameter.getDecorators(InjectDecorator);
                    const inject: InjectDecorator = injectDecorators[0] as InjectDecorator;

                    const optionalDecorators: readonly Decorator[] = parameter.getDecorators(OptionalDecorator);
                    const optional: Empty<OptionalDecorator> = optionalDecorators.length ? (optionalDecorators[0] as OptionalDecorator) : undefined;

                    const namedDecorators: readonly Decorator[] = parameter.getDecorators(NamedDecorator);
                    const named: Empty<NamedDecorator> = namedDecorators.length ? (namedDecorators[0] as NamedDecorator) : undefined;

                    metaInfo.constructorParameters.push({
                        type: inject.getType(),
                        named: named?.getName(),
                        optional: !!optional,
                        classMember: parameter,
                    });
                }
            });

            reflector.getDecoratedFields().forEach((field) => {
                if (field.hasDecorators(InjectDecorator)) {
                    const injectDecorators: readonly Decorator[] = field.getDecorators(InjectDecorator);
                    const inject: InjectDecorator = injectDecorators[0] as InjectDecorator;

                    const optionalDecorators: readonly Decorator[] = field.getDecorators(OptionalDecorator);
                    const optional: Empty<OptionalDecorator> = optionalDecorators.length ? (optionalDecorators[0] as OptionalDecorator) : undefined;

                    const namedDecorators: readonly Decorator[] = field.getDecorators(NamedDecorator);
                    const named: Empty<NamedDecorator> = namedDecorators.length ? (namedDecorators[0] as NamedDecorator) : undefined;

                    metaInfo.fields[field.getName()] = {
                        type: inject.getType(),
                        named: named?.getName(),
                        optional: !!optional,
                        classMember: field,
                    };
                }
            });

            reflector.getDecoratedMethods().forEach((method) => {
                if (method.hasDecorators(PostConstructDecorator)) {
                    metaInfo.postConstructs.push(method);
                } else if (method.hasDecorators(PreDestroyDecorator)) {
                    metaInfo.preDestroys.push(method);
                }
            });

            return metaInfo;
        };

        const classtable: IClassTable = Reflector.getClassTable();
        const classes: ReadonlySet<IClass<object>> = classtable.getClasses();
        expect(classes.size).toEqual(2);

        // runtime decoration of class AnotherChildClass that does not have any own decorators
        Reflector.from(AnotherChildClass).getConstructor().addDecorator(metaclass());
        expect(classes.size).toEqual(3);

        const mataInfoByClass: Map<IClass<object>, MetaInfo> = new Map<IClass<object>, MetaInfo>();

        classes.forEach((decoratedClass: IClass<object>) => {
            const reflector: Reflector = Reflector.from(decoratedClass);
            if (reflector.query().filter(ByDecoratorClass.from(InjectDecorator)).members().all().length > 0) {
                mataInfoByClass.set(decoratedClass, proceedDecoratedClass(decoratedClass));
            }
        });

        expect(mataInfoByClass.size).toEqual(3);
        // BaseClass
        const baseClassMetaInfo: MetaInfo = mataInfoByClass.get(BaseClass) ?? throwError(new Error("BaseClass not found"));
        expect(baseClassMetaInfo.constructorParameters.length).toEqual(2);

        expect(baseClassMetaInfo.constructorParameters[0].type).toEqual(SomeType);
        expect(baseClassMetaInfo.constructorParameters[0].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[0].optional).toBeFalsy();

        expect(baseClassMetaInfo.constructorParameters[1].type).toEqual(AnotherTypeInterface);
        expect(baseClassMetaInfo.constructorParameters[1].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[1].optional).toBeTruthy();

        expect(baseClassMetaInfo.fields.someProperty.type).toEqual(SomeType);
        expect(baseClassMetaInfo.fields.someProperty.named).toEqual("someProperty");
        expect(baseClassMetaInfo.fields.someProperty.optional).toBeFalsy();

        expect(baseClassMetaInfo.postConstructs.length).toEqual(1);
        expect(baseClassMetaInfo.preDestroys.length).toEqual(0);

        // ChildClass
        const childClassMetaInfo: MetaInfo = mataInfoByClass.get(ChildClass) ?? throwError(new Error("ChildClass not found"));

        // inherited from BaseClass
        expect(childClassMetaInfo.constructorParameters.length).toEqual(2);

        expect(baseClassMetaInfo.constructorParameters[0].type).toEqual(SomeType);
        expect(baseClassMetaInfo.constructorParameters[0].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[0].optional).toBeFalsy();

        expect(baseClassMetaInfo.constructorParameters[1].type).toEqual(AnotherTypeInterface);
        expect(baseClassMetaInfo.constructorParameters[1].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[1].optional).toBeTruthy();

        // inherited from BaseClass
        expect(baseClassMetaInfo.fields.someProperty.type).toEqual(SomeType);
        expect(baseClassMetaInfo.fields.someProperty.named).toEqual("someProperty");
        expect(baseClassMetaInfo.fields.someProperty.optional).toBeFalsy();

        // own
        expect(childClassMetaInfo.fields.someOtherProperty.type).toEqual(SomeType);
        expect(childClassMetaInfo.fields.someOtherProperty.named).toBeUndefined();
        expect(childClassMetaInfo.fields.someOtherProperty.optional).toBeFalsy();

        expect(childClassMetaInfo.postConstructs.length).toEqual(2);
        expect(childClassMetaInfo.preDestroys.length).toEqual(0);


        // AnotherChildClass
        const anotherChildClassMetaInfo: MetaInfo = mataInfoByClass.get(AnotherChildClass) ?? throwError(new Error("AnotherChildClass not found"));

        // inherited from BaseClass
        expect(anotherChildClassMetaInfo.constructorParameters.length).toEqual(2);

        expect(childClassMetaInfo.constructorParameters.length).toEqual(2);

        expect(baseClassMetaInfo.constructorParameters[0].type).toEqual(SomeType);
        expect(baseClassMetaInfo.constructorParameters[0].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[0].optional).toBeFalsy();

        expect(baseClassMetaInfo.constructorParameters[1].type).toEqual(AnotherTypeInterface);
        expect(baseClassMetaInfo.constructorParameters[1].named).toBeUndefined();
        expect(baseClassMetaInfo.constructorParameters[1].optional).toBeTruthy();

        // inherited from BaseClass
        expect(baseClassMetaInfo.fields.someProperty.type).toEqual(SomeType);
        expect(baseClassMetaInfo.fields.someProperty.named).toEqual("someProperty");
        expect(baseClassMetaInfo.fields.someProperty.optional).toBeFalsy();


    });
});

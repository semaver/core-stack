import {IClass} from "@semaver/core";
import {
    Constructor,
    DecoratedElementEnum,
    IMetadataClass,
    IMetatableDecorator,
    metadataClassOfObject,
    MetadataTableProvider,
} from "../../src";

export function testOwnAccessors<T extends object>(someClass: IClass<T>,
                                                   totalMembers: number,
                                                   staticMembers: number,
                                                   instMembers: number): void {
    const decoratedClass: IMetadataClass<T> = metadataClassOfObject(someClass);
    const decorators: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();

    const accessors: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementEnum.ACCESSOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(accessors.length).toBe(totalMembers);

    const staticAccessors: IMetatableDecorator[] = accessors.filter((value) => value.__metadata__.isStatic);
    const instAccessors: IMetatableDecorator[] = accessors.filter((value) => !value.__metadata__.isStatic);

    expect(staticAccessors.length).toBe(staticMembers);
    expect(instAccessors.length).toBe(instMembers);
}

export function testOwnProperties<T extends object>(someClass: IClass<T>,
                                                    totalMembers: number,
                                                    staticMembers: number,
                                                    instMembers: number): void {
    const decoratedClass: IMetadataClass<T> = metadataClassOfObject(someClass);
    const descriptors: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();
    const properties: IMetatableDecorator[] = descriptors.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementEnum.PROPERTY) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(properties.length).toBe(totalMembers);

    const staticProperties: IMetatableDecorator[] = properties.filter((value) => value.__metadata__.isStatic);
    const instProperties: IMetatableDecorator[] = properties.filter((value) => !value.__metadata__.isStatic);

    expect(staticProperties.length).toBe(staticMembers);
    expect(instProperties.length).toBe(instMembers);
}

export function testOwnArguments<T extends object>(someClass: IClass<T>,
                                                   totalArgs: number,
                                                   staticMethodArgs: number,
                                                   instMethodArgs: number,
                                                   constructorArgs: number): void {
    const decoratedClass: IMetadataClass<T> = metadataClassOfObject(someClass);
    const descriptors: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();

    const args: IMetatableDecorator[] = descriptors.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementEnum.METHODS_PARAMETER || decorator.__metadata__.type === DecoratedElementEnum.CONSTRUCTOR_PARAMETER) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(args.length).toBe(totalArgs);

    const staticMethodParams: IMetatableDecorator[] = args.filter((value) => value.__metadata__.isStatic && value.__metadata__.type !== DecoratedElementEnum.CONSTRUCTOR_PARAMETER);
    const instMethodParams: IMetatableDecorator[] = args.filter((value) => !value.__metadata__.isStatic && value.__metadata__.type !== DecoratedElementEnum.CONSTRUCTOR_PARAMETER);
    const constructorParams: IMetatableDecorator[] = args.filter((value) => value.__metadata__.type === DecoratedElementEnum.CONSTRUCTOR_PARAMETER);

    expect(staticMethodParams.length).toBe(staticMethodArgs);
    expect(instMethodParams.length).toBe(instMethodArgs);
    expect(constructorParams.length).toBe(constructorArgs);
}

export function testOwnConstructors<T extends object>(someClass: IClass<T>,
                                                      argLength: number): void {
    const decoratedClass: IMetadataClass<T> = metadataClassOfObject(someClass);
    const descriptors: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();

    const constructors: IMetatableDecorator[] = descriptors.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementEnum.CONSTRUCTOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(constructors.length).toBe(argLength);
    expect(constructors[0].__metadata__.name).toBe(Constructor.defaultName);
}

export function testOwnMethods<T extends object>(someClass: IClass<T>,
                                                 totalMembers: number,
                                                 staticMembers: number,
                                                 instMembers: number): void {
    const decoratedClass: IMetadataClass<T> = metadataClassOfObject(someClass);
    const descriptors: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();

    const methods: IMetatableDecorator[] = descriptors.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementEnum.METHOD) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(methods.length).toBe(totalMembers);

    const staticMethods: IMetatableDecorator[] = methods.filter((value) => value.__metadata__.isStatic);
    const instMethods: IMetatableDecorator[] = methods.filter((value) => !value.__metadata__.isStatic);

    expect(staticMethods.length).toBe(staticMembers);
    expect(instMethods.length).toBe(instMembers);
}

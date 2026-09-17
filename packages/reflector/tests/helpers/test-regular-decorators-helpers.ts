import {IClass} from "@semaver/core";
import {DecoratedElementEnum, IMetadataClass, IMetatableDecorator, MetadataClassNames, MetadataTableProvider,} from "../../src";

export function testAllDescriptors<T extends object>(
    someClass: IClass<T>,
    ndAccessors: number,
    ndProperties: number,
    ndParams: number,
    ndConstructor: number,
    ndMethods: number,
): void {
    const decoratedClass: IMetadataClass<T> = someClass as IMetadataClass<T>;
    const decorators: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getDecorators();
    testDecorators(
        decorators,
        ndAccessors,
        ndProperties,
        ndParams,
        ndConstructor,
        ndMethods,
    );

}

export function testOwnDecorators<T extends object>(
    someClass: IClass<T>,
    ndAccessors: number,
    ndProperties: number,
    ndParams: number,
    ndConstructor: number,
    ndMethods: number,
): void {
    const decoratedClass: IMetadataClass<T> = someClass as IMetadataClass<T>;
    const decorators: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();
    testDecorators(
        decorators,
        ndAccessors,
        ndProperties,
        ndParams,
        ndConstructor,
        ndMethods,
    );
}

function testDecorators(
    decorators: IMetatableDecorator[],
    ndAccessors: number,
    ndProperties: number,
    ndParams: number,
    ndConstructor: number,
    ndMethods: number,
): void {
    const accessorDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.ACCESSOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const propertyDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.PROPERTY) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const parameterDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.CONSTRUCTOR_PARAMETER || decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.METHODS_PARAMETER) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const constructorDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.CONSTRUCTOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const methodDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator[MetadataClassNames.METADATA].type === DecoratedElementEnum.METHOD) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    expect(accessorDecorators.length).toBe(ndAccessors);
    expect(propertyDecorators.length).toBe(ndProperties);
    expect(parameterDecorators.length).toBe(ndParams);
    expect(constructorDecorators.length).toBe(ndConstructor);
    expect(methodDecorators.length).toBe(ndMethods);
}

import {IClass} from "@semaver/core";
import {DecoratedElementType, IMetadataClass, IMetatableDecorator, MetadataTableProvider,} from "../../src";

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
        if (decorator.__metadata__.type === DecoratedElementType.ACCESSOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const propertyDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementType.PROPERTY) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const parameterDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementType.CONSTRUCTOR_PARAMETER || decorator.__metadata__.type === DecoratedElementType.METHODS_PARAMETER) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const constructorDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementType.CONSTRUCTOR) {
            collection.push(decorator);
        }
        return collection;
    }, new Array<IMetatableDecorator>());

    const methodDecorators: IMetatableDecorator[] = decorators.reduce((collection, decorator) => {
        if (decorator.__metadata__.type === DecoratedElementType.METHOD) {
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

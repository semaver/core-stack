import {IClass} from "@semaver/core";
import {IMetadataClass, IMetatableDecorator, MetadataTableProvider} from "../../src";

export function testClassInitialDescriptors<T extends object>(someClass: IClass<T>): void {
    const decoratedClass: IMetadataClass<T> = someClass as IMetadataClass<T>;
    const superOwnDecorators: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getOwnDecorators();

    expect(superOwnDecorators).toBeDefined();
    expect(superOwnDecorators).not.toBeNull();

    const superAllDecorators: IMetatableDecorator[] = new MetadataTableProvider(decoratedClass).getDecorators();

    expect(superAllDecorators).toBeDefined();
    expect(superAllDecorators).not.toBeNull();

    // --------------------------------------------

    expect(decoratedClass.__metadata__).toBeDefined();
    expect(decoratedClass.__metadata__).not.toBeNull();

}

export function testSuperAndChildInitialDescriptors<S extends object, C extends S>(superClass: IClass<S>, childCLass: IClass<C>): void {
    testClassInitialDescriptors(superClass);
    testClassInitialDescriptors(childCLass);

    const superDecoratedClass: IMetadataClass<S> = superClass as IMetadataClass<S>;
    const childDecoratedClass: IMetadataClass<C> = childCLass as IMetadataClass<C>;

    expect(superDecoratedClass.__metadata__).toEqual(Object.getPrototypeOf(childDecoratedClass.prototype).constructor.__metadata__);
}

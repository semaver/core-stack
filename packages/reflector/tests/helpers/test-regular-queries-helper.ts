import {IClass} from "@semaver/core";
import {Accessor, ByMemberType, Constructor, DecoratedElementType, Method, Property, Reflector,} from "../../src";

export function testQueries<T extends object>(
    someClass: IClass<T>,
    ndAccessors: number,
    ndProperties: number,
    ndParams: number,
    ndConstructor: number,
    ndMethods: number,
    ndConsrtuctorArguments: number,
    ndMethodsArguments: number,
): void {
    const info: Reflector<T> = Reflector.from(someClass);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.ACCESSOR)).members().all<Accessor<T>>().length).toBe(ndAccessors);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.PROPERTY)).members().all<Property<T>>().length).toBe(ndProperties);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.CONSTRUCTOR)).members().all<Constructor<T>>().length).toBe(ndConstructor);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.METHOD)).members().all<Method<T>>().length).toBe(ndMethods);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.ACCESSOR, DecoratedElementType.PROPERTY)).members().all().length).toBe(ndAccessors + ndProperties);

    expect(info.query().filter(ByMemberType.from(DecoratedElementType.CONSTRUCTOR)).decorators().ofParameters().length).toBe(ndConsrtuctorArguments);
    expect(info.query().filter(ByMemberType.from(DecoratedElementType.METHOD)).decorators().ofParameters().length).toBe(ndMethodsArguments);
}

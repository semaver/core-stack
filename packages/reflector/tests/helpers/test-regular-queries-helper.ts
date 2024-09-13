import {IClass} from "@semaver/core";
import {Accessor, ByMemberType, Constructor, DecoratedElementEnum, Method, Property, Reflector,} from "../../src";

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
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.ACCESSOR)).members().all<Accessor<T>>().length).toBe(ndAccessors);
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.PROPERTY)).members().all<Property<T>>().length).toBe(ndProperties);
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).members().all<Constructor<T>>().length).toBe(ndConstructor);
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.METHOD)).members().all<Method<T>>().length).toBe(ndMethods);
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.ACCESSOR, DecoratedElementEnum.PROPERTY)).members().all().length).toBe(ndAccessors + ndProperties);

    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.CONSTRUCTOR)).decorators().ofParameters().length).toBe(ndConsrtuctorArguments);
    expect(info.query().filter(ByMemberType.from(DecoratedElementEnum.METHOD)).decorators().ofParameters().length).toBe(ndMethodsArguments);
}

import {isObjectClass, Empty, Throwable, throwDefault} from "@semaver/core";
import {Constructor} from "../reflector/members/Constructor";
import {IMetadataClass} from "./classes/IMetadataClass";
import {IMemberMetadata} from "./metadata/IMemberMetadata";
import {MetadataAccessPolicy} from "./policies/MetadataAccessPolicy";
import {DecoratedElementEnum} from "./types/DecoratedElementEnum";
import {metadataClassOfObject} from "../extentions/MetadataObjectExtention";

/**
 * function to generate parameter metadata
 *
 * @public
 * @param target - metadata class or instance that contains class member with provided parameter in constructor or method
 * @param name - class name for constructor or method name for methods
 * @param index - index(position) of parameter in constructor or method
 * @returns class member metadata
 */
export function getParameterMetadata<T extends object>(target: T, name: Empty<string>, index: number): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);

    const isStatic: boolean = isObjectClass(target);
    const isConstructor: boolean = !name && isStatic;

    return {
        type: isConstructor ? DecoratedElementEnum.CONSTRUCTOR_PARAMETER : DecoratedElementEnum.METHODS_PARAMETER,
        name: name ?? Constructor.defaultName,
        owner: targetClass,
        isStatic: !!name && isStatic,
        access: isConstructor
            ? MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR
            : isStatic
                ? MetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD
                : MetadataAccessPolicy.PARAMETER_IN_INSTANCE_METHOD,

        parameterIndex: index,
    };

}

/**
 * function to generate method metadata
 *
 * @public
 * @param target - metadata class or instance that contains method
 * @param name - method name
 * @returns class member metadata
 */
export function getMethodMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementEnum.METHOD,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_METHOD : MetadataAccessPolicy.INSTANCE_METHOD,
        parameterIndex: -1,
    };
}

/**
 * function to generate accessor metadata
 *
 * @public
 * @param target - metadata class or instance that contains accessor
 * @param name - accessor name
 * @returns class member metadata
 */
export function getAccessorMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementEnum.ACCESSOR,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_ACCESSOR : MetadataAccessPolicy.INSTANCE_ACCESSOR,
        parameterIndex: -1,
    };
}

/**
 * function to generate property metadata
 *
 * @public
 * @param target - metadata class or instance that contains property
 * @param name - property name
 * @returns class member metadata
 */
export function getPropertyMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementEnum.PROPERTY,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_PROPERTY : MetadataAccessPolicy.INSTANCE_PROPERTY,
        parameterIndex: -1,
    };

}

/**
 * function to generate constructor metadata
 *
 * @public
 * @param target - metadata class or instance that contains constructor
 * @returns class member metadata
 */
export function getConstructorMetadata<T extends object>(target: T): IMemberMetadata<T> {
    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);

    return {
        type: DecoratedElementEnum.CONSTRUCTOR,
        name: Constructor.defaultName,
        owner: targetClass,
        isStatic: false,
        access: MetadataAccessPolicy.CONSTRUCTOR,
        parameterIndex: -1,
    };
}

/**
 * function to generate class member metadata from JS TypedPropertyDescriptor
 *
 * @public
 * @param target - metadata class or instance that contains class member
 * @param classMemberName  - class member name
 * @param propertyDescriptorOrIndex - JS TypedPropertyDescriptor of class member
 * @returns class member metadata or throws error if class member not found
 */
export function getMetadata<T extends object>(target: T, classMemberName?: string, propertyDescriptorOrIndex?: TypedPropertyDescriptor<T> | number): Throwable<IMemberMetadata<T>> {
    let propertyDescriptor: Empty<TypedPropertyDescriptor<T>>;
    let index: number = NaN;

    if (propertyDescriptorOrIndex !== undefined) {
        if (isNaN(+propertyDescriptorOrIndex)) {
            propertyDescriptor = propertyDescriptorOrIndex as Empty<TypedPropertyDescriptor<T>>;
        } else {
            index = +propertyDescriptorOrIndex;
        }
    }

    if (classMemberName && isNaN(index) && propertyDescriptor?.value instanceof Function) {
        return getMethodMetadata(target, classMemberName);
    }

    if (classMemberName && isNaN(index) && (propertyDescriptor?.get || propertyDescriptor?.set)) {
        return getAccessorMetadata(target, classMemberName);
    }

    if (classMemberName && isNaN(index) && !propertyDescriptor) {
        return getPropertyMetadata(target, classMemberName);
    }

    if (!isNaN(index) && !propertyDescriptor) {
        return getParameterMetadata(target, classMemberName, index);
    }

    if (!classMemberName && isNaN(index) && !propertyDescriptor) {
        return getConstructorMetadata(target);
    }

    throwDefault(target, "Metadata not found");
}

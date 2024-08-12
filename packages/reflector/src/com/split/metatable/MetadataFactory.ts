import {isObjectClass, Nullable} from "@semaver/core";
import {Constructor} from "../reflector/members/Constructor";
import {IMetadataClass} from "./classes/IMetadataClass";
import {IMemberMetadata} from "./metadata/IMemberMetadata";
import {MetadataAccessPolicy} from "./policies/MetadataAccessPolicy";
import {DecoratedElementType} from "./types/DecoratedElementType";
import {metadataClassOfObject} from "../extentions/MetadataObjectExtention";

/**
 * @public
 * @function to generate parameter metadata
 * @param target - metadata class or instance that contains class member with provided parameter in constructor or method
 * @param name - class name for constructor or method name for methods
 * @param index - index(position) of parameter in constructor or method
 */
export function getParameterMetadata<T extends object>(target: T, name: Nullable<string>, index: number): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);

    const isStatic: boolean = isObjectClass(target);
    const isConstructor: boolean = !name && isStatic;

    return {
        type: isConstructor ? DecoratedElementType.CONSTRUCTOR_PARAMETER : DecoratedElementType.METHODS_PARAMETER,
        name: name ?? Constructor.defaultName,
        owner: targetClass,
        isStatic: !!name && isStatic,
        access: isConstructor
            ? MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR
            : isStatic
                ? MetadataAccessPolicy.PARAMETER_IN_STATIC_METHOD
                : MetadataAccessPolicy.PARAMETER_IN_INST_METHOD,

        parameterIndex: index,
    };

}

/**
 * @public
 * @function to generate method metadata
 * @param target - metadata class or instance that contains method
 * @param name - method name
 */
export function getMethodMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementType.METHOD,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_METHOD : MetadataAccessPolicy.INST_METHOD,
        parameterIndex: -1,
    };
}

/**
 * @public
 * @function to generate accessor metadata
 * @param target - metadata class or instance that contains accessor
 * @param name - accessor name
 */
export function getAccessorMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementType.ACCESSOR,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_ACCESSOR : MetadataAccessPolicy.INST_ACCESSOR,
        parameterIndex: -1,
    };
}

/**
 * @public
 * @function to generate property metadata
 * @param target - metadata class or instance that contains property
 * @param name - property name
 */
export function getPropertyMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);
    const isStatic: boolean = isObjectClass(target);

    return {
        type: DecoratedElementType.PROPERTY,
        name,
        owner: targetClass,
        isStatic,
        access: isStatic ? MetadataAccessPolicy.STATIC_PROPERTY : MetadataAccessPolicy.INST_PROPERTY,
        parameterIndex: -1,
    };

}

/**
 * @public
 * @function to generate constructor metadata
 * @param target - metadata class or instance that contains constructor
 */
export function getConstructorMetadata<T extends object>(target: T): IMemberMetadata<T> {
    const targetClass: IMetadataClass<T> = metadataClassOfObject(target);

    return {
        type: DecoratedElementType.CONSTRUCTOR,
        name: Constructor.defaultName,
        owner: targetClass,
        isStatic: false,
        access: MetadataAccessPolicy.CONSTRUCTOR,
        parameterIndex: -1,
    };
}

/**
 * @public
 * @function to generate class member metadata from JS TypedPropertyDescriptor
 * @param target - metadata class or instance that contains class member
 * @param classMemberName  - class member name
 * @param propertyDescriptorOrIndex - JS TypedPropertyDescriptor of class member
 */
export function getMetadata<T extends object>(target: T, classMemberName?: string, propertyDescriptorOrIndex?: TypedPropertyDescriptor<T> | number): Nullable<IMemberMetadata<T>> {
    let propertyDescriptor: Nullable<TypedPropertyDescriptor<T>>;
    let index: number = NaN;

    if (propertyDescriptorOrIndex !== undefined) {
        if (isNaN(+propertyDescriptorOrIndex)) {
            propertyDescriptor = propertyDescriptorOrIndex as Nullable<TypedPropertyDescriptor<T>>;
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

    return undefined;
}

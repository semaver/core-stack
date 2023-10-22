import {CoreObject, Nullable} from "@semaver/core";
import {MetadataObject} from "../extentions/MetadataObjectExtention";
import {Constructor} from "../reflector/members/Constructor";
import {IMetadataClass} from "./classes/IMetadataClass";
import {IMemberMetadata} from "./metadata/IMemberMetadata";
import {MetadataAccessPolicy} from "./policies/MetadataAccessPolicy";
import {DecoratedElementType} from "./types/DecoratedElementType";

/**
 * @public
 * @class
 * @description - metadata factory, create class members metadata
 */
export class MetadataFactory {
    /**
     * @public
     * @static
     * @method to generate parameter metadata
     * @param target - metadata class or instance that contains class member with provided parameter in constructor or method
     * @param name - class name for constructor or method name for methods
     * @param index - index(position) of parameter in constructor or method
     */
    public static getParameterMetadata<T extends object>(target: T, name: string, index: number): IMemberMetadata<T> {

        const targetClass: IMetadataClass<T> = MetadataObject.classOf(target);

        const isStatic: boolean = CoreObject.isClass(target);
        const isConstructor: boolean = !name && isStatic;

        return {
            type: isConstructor ? DecoratedElementType.CONSTRUCTOR_PARAMETER : DecoratedElementType.METHODS_PARAMETER,
            name: name || Constructor.defaultName,
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
     * @static
     * @method to generate method metadata
     * @param target - metadata class or instance that contains method
     * @param name - method name
     */
    public static getMethodMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

        const targetClass: IMetadataClass<T> = MetadataObject.classOf(target);
        const isStatic: boolean = CoreObject.isClass(target);

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
     * @static
     * @method to generate accessor metadata
     * @param target - metadata class or instance that contains accessor
     * @param name - accessor name
     */
    public static getAccessorMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

        const targetClass: IMetadataClass<T> = MetadataObject.classOf(target);
        const isStatic: boolean = CoreObject.isClass(target);

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
     * @static
     * @method to generate property metadata
     * @param target - metadata class or instance that contains property
     * @param name - property name
     */
    public static getPropertyMetadata<T extends object>(target: T, name: string): IMemberMetadata<T> {

        const targetClass: IMetadataClass<T> = MetadataObject.classOf(target);
        const isStatic: boolean = CoreObject.isClass(target);

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
     * @static
     * @method to generate constructor metadata
     * @param target - metadata class or instance that contains constructor
     */
    public static getConstructorMetadata<T extends object>(target: T): IMemberMetadata<T> {
        const targetClass: IMetadataClass<T> = MetadataObject.classOf(target);

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
     * @static
     * @method to generate class member metadata from JS TypedPropertyDescriptor
     * @param target - metadata class or instance that contains class member
     * @param classMemberName  - class member name
     * @param typedPropertyDescriptor - JS TypedPropertyDescriptor
     */
    public static getMetadata<T extends object>(target: T, classMemberName: string, typedPropertyDescriptor: TypedPropertyDescriptor<unknown>): Nullable<IMemberMetadata<T>> {
        if (!isNaN(+typedPropertyDescriptor)) {
            return MetadataFactory.getParameterMetadata(target, classMemberName, +typedPropertyDescriptor);
        } else if (typedPropertyDescriptor && typedPropertyDescriptor.value instanceof Function) {
            return MetadataFactory.getMethodMetadata(target, classMemberName);
        } else if (typedPropertyDescriptor && (typedPropertyDescriptor.get instanceof Function || typedPropertyDescriptor.set instanceof Function)) {
            return MetadataFactory.getAccessorMetadata(target, classMemberName);
        } else if (classMemberName && (!typedPropertyDescriptor || !(typedPropertyDescriptor.value instanceof Function))) {
            return MetadataFactory.getPropertyMetadata(target, classMemberName);
        } else if (!classMemberName && !typedPropertyDescriptor) {
            return MetadataFactory.getConstructorMetadata(target);
        } else {
            return undefined;
        }
    }
}

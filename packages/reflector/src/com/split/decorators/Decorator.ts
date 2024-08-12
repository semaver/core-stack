import {IMetadataClass, MetadataClassNames} from "../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../metatable/metadata/IMemberMetadata";
import {MetadataTableProvider} from "../metatable/MetadataTableProvider";
import {
    MetadataAccessPolicy,
    MetadataAccessPolicyValues,
    PrimitiveMetadataAccessPolicy,
    PrimitiveMetadataAccessPolicyValues
} from "../metatable/policies/MetadataAccessPolicy";
import {MetadataAppearancePolicy, MetadataAppearancePolicyValues} from "../metatable/policies/MetadataAppearancePolicy";
import {MetadataCollisionPolicy, MetadataCollisionPolicyValues} from "../metatable/policies/MetadataCollisionPolicy";
import {
    MetadataNotExistencePolicy,
    MetadataNotExistencePolicyValues
} from "../metatable/policies/MetadataNotExistencePolicy";
import {
    MetadataSameTargetMultiUsagePolicy,
    MetadataSameTargetMultiUsagePolicyValues
} from "../metatable/policies/MetadataSameTargetMultiUsagePolicy";
import {metadataClassOfObject} from "../extentions/MetadataObjectExtention";
import {getMetadata} from "../metatable/MetadataFactory";


/**
 * @public
 * @interface type
 * @description - type for decorator [[Decorator]] that contains also metadata information [[IMemberMetadata]]
 */
export type IMetatableDecorator = Decorator & { __metadata__: IMemberMetadata };

/**
 * @public
 * @interface type
 * @description - type for decorator function (@myDecorator) used to decorate class members and parameters
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DecoratorFn = (target: object, key?: string, descriptorOrIndex?: TypedPropertyDescriptor<any> | number) => void;

/**
 * @public
 * @abstract
 * @class
 * @description - base class used to create custom decorators and perform decoration of class members
 */
export abstract class Decorator {

    /**
     * @public
     * @method to build class member and parameter metadata from provided decorator [[Decorator]]
     * @return decorator function [[DecoratorFn]]
     */
    public static build(decorator: Decorator): DecoratorFn {
        return (target: object, key?: string, descriptorOrIndex?: TypedPropertyDescriptor<object> | number): void => {
            const metadataTableClass: IMetadataClass<object> = this.buildClass(target);
            const metadataDecorator: IMetatableDecorator = this.buildMetadataDecorator(decorator, target, key, descriptorOrIndex);
            const metadataTableProvider: MetadataTableProvider = new MetadataTableProvider(metadataTableClass);
            metadataTableProvider.add(metadataDecorator);
        };
    }

    /**
     * @private
     * @static
     * @method to get class with metadata table from descriptor arguments
     * @param target - target object
     * @return class with metadata table [[IMetadataClass]]
     */
    private static buildClass<T extends object>(target: T): IMetadataClass<T> {
        return metadataClassOfObject(target);
    }

    /**
     * @private
     * @static
     * @method to build class metadata from provided data
     * @param decorator - decorator [[Decorator]] itself with metadata information
     * @param target - target object
     * @param key - key of class member from typed property descriptor
     * @param descriptorOrIndex - descriptor or index of class member from typed property descriptor
     * @return class member metadata [[IMetatableDecorator]]
     */
    private static buildMetadataDecorator<T extends object>(decorator: Decorator, target: T, key?: string, descriptorOrIndex?: TypedPropertyDescriptor<T> | number): IMetatableDecorator {
        // TODO handle error if not created
        Reflect.defineProperty(decorator, MetadataClassNames.METADATA, {
            configurable: false,
            enumerable: true,
            value: getMetadata(target, key, descriptorOrIndex),
            writable: false,
        });

        return decorator as IMetatableDecorator;
    }

    /**
     * @public
     * @method to get decorator parameters
     * @return readonly collection of parameters
     */
    public getParameters(): readonly unknown[] {
        return [];
    }

    /**
     * @public
     * @method to get access policy [[MetadataAccessPolicyValues]] of decorator
     * @return  access policy value [[MetadataAccessPolicyValues]]
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.ALL;
    }

    /**
     * @public
     * @method to get collision policy [[MetadataCollisionPolicyValues]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return collision policy value [[MetadataCollisionPolicyValues]]
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        void (access);
        return MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get not existence policy [[MetadataNotExistencePolicyValues]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return  not existence policy value [[MetadataNotExistencePolicyValues]]
     */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        void (access);
        return MetadataNotExistencePolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get appearance policy [[MetadataAppearancePolicyValues]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return appearance policy value [[MetadataAppearancePolicyValues]]
     */
    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        void (access);
        return MetadataAppearancePolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get same target usage policy [[MetadataSameTargetMultiUsagePolicyValues]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicyValues]]
     * @return same target usage policy value [[MetadataSameTargetMultiUsagePolicyValues]]
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        void (access);
        return MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }
}

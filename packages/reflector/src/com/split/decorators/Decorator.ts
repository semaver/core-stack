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
 * type for decorator that contains also metadata information about class member
 *
 * @public
 * @interface type
 */
export type IMetatableDecorator = Decorator & { __metadata__: IMemberMetadata };

/**
 * type for decorator function (@myDecorator) used to decorate class members and parameters
 *
 * @public
 * @interface type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DecoratorFn = (target: object, key?: string, descriptorOrIndex?: TypedPropertyDescriptor<any> | number) => void;

/**
 * base class used to create custom decorators and perform decoration of class members
 *
 * @public
 */
export abstract class Decorator {

    /**
     * method to build class member and parameter metadata from provided decorator
     *
     * @public
     * @returns decorator function
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
     * method to get class with metadata table from descriptor arguments
     *
     * @private
     * @param target - target object
     * @returns class with metadata table
     */
    private static buildClass<T extends object>(target: T): IMetadataClass<T> {
        return metadataClassOfObject(target);
    }

    /**
     * method to build class metadata from provided data
     *
     * @private
     * @param decorator - decorator  itself with metadata information
     * @param target - target object
     * @param key - key of class member from typed property descriptor
     * @param descriptorOrIndex - descriptor or index of class member from typed property descriptor
     * @returns class member metadata
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
     * method to get decorator parameters
     *
     * @public
     * @returns readonly collection of parameters
     */
    public getParameters(): readonly unknown[] {
        return [];
    }

    /**
     * method to get access policy of decorator
     *
     * @public
     * @returns  access policy value
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.ALL;
    }

    /**
     * method to get collision policy of decorator by access
     *
     * @public
     * @param access - primitive access policy
     * @returns collision policy value
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        void (access);
        return MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * method to get not existence policy of decorator by access
     *
     * @public
     * @param access - primitive access policy
     * @returns  not existence policy value
     */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicyValues {
        void (access);
        return MetadataNotExistencePolicy.DEFAULT;
    }

    /**
     * method to get appearance policy of decorator by access
     *
     * @public
     * @param access - primitive access policy
     * @returns appearance policy value
     */
    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicyValues {
        void (access);
        return MetadataAppearancePolicy.DEFAULT;
    }

    /**
     * method to get same target usage policy [[MetadataSameTargetMultiUsagePolicyValues]] of decorator by access
     *
     * @public
     * @param access - primitive access policy
     * @returns same target usage policy value
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        void (access);
        return MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }
}

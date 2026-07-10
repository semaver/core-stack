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
 * abstract base class for custom decorators; subclass it and override the policy getters (access, collision, appearance, not-existence and same-target-multi-usage) to control how the decorator's metadata is registered in the class metatable and how it interacts with existing metadata, then expose it as a decorator function via {@link Decorator.build}.
 *
 * @public
 */
export abstract class Decorator {

    /**
     * method to wrap a decorator instance into a TS decorator function (`DecoratorFn`); the returned function, when applied to a decorated class member or parameter, resolves the target's metadata class, attaches the decorator's member metadata to the decorator, and registers it in that class's metadata table.
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
     * method to get the parameters carried by this decorator; the base implementation returns an empty collection, so custom decorators should override it to supply their own arguments, which consumers can read back via the reflected member's getDecorators().
     *
     * @public
     * @returns readonly collection of parameters
     */
    public getParameters(): readonly unknown[] {
        return [];
    }

    /**
     * method to get the access policy restricting which member kinds (constructor, instance/static property, accessor, method, and parameters) the decorator may be applied to; members that do not match the policy are skipped and no metadata is registered. Base implementation returns ALL (all member kinds).
     *
     * @public
     * @returns  access policy value
     */
    public getAccessPolicy(): MetadataAccessPolicyValues {
        return MetadataAccessPolicy.ALL;
    }

    /**
     * method to get the collision policy of this decorator: the rule applied when a member in a child class and in a superclass both carry a decorator of the same type. The policy decides whether the child's, the parent's, both, or neither decorator is used for the child class (or whether an error is thrown). Base implementation returns DEFAULT (equivalent to OVERRIDE_PARENT). Override to vary the policy per member kind via the access argument.
     *
     * @public
     * @param access - primitive access policy identifying the member kind the policy applies to
     * @returns collision policy value
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicyValues {
        void (access);
        return MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * method to get the "not existence" policy for the given access: when a child-class member has no decorator of this type but a superclass member does, this policy decides whether that inherited decorator is applied to the child (APPLY) or ignored (SKIP). Base implementation returns DEFAULT (which resolves to APPLY); the access argument lets subclasses vary the policy per member kind.
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
     * method to get the appearance policy that governs a decorator which newly appears on a member in a child class while no superclass declares the same decorator type; the policy decides whether that decorator is applied (APPLY) or skipped (SKIP). Base implementation returns DEFAULT, which resolves to APPLY. The access argument lets the policy vary per member access kind.
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
     * method to get the policy applied when a single class member carries more than one decorator of the same type; the policy decides whether all such decorators are registered in the metatable (ALLOWED) or only the first (NOT_ALLOWED). Base implementation returns DEFAULT (equivalent to NOT_ALLOWED). Override to vary the policy per member access kind via the access argument.
     *
     * @public
     * @param access - primitive access policy for which the policy applies
     * @returns same target multi usage policy value
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicyValues = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicyValues {
        void (access);
        return MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }
}

import {IFunction} from "@semaver/core";
import {MetadataObject} from "../extentions/MetadataObjectExtention";
import {IMetadataClass, MetadataClassNames} from "../metatable/classes/IMetadataClass";
import {IMemberMetadata} from "../metatable/metadata/IMemberMetadata";
import {MetadataFactory} from "../metatable/MetadataFactory";
import {MetadataTableProvider} from "../metatable/MetadataTableProvider";
import {MetadataAccessPolicy, PrimitiveMetadataAccessPolicy} from "../metatable/policies/MetadataAccessPolicy";
import {MetadataAppearancePolicy} from "../metatable/policies/MetadataAppearancePolicy";
import {MetadataCollisionPolicy} from "../metatable/policies/MetadataCollisionPolicy";
import {MetadataNotExistencePolicy} from "../metatable/policies/MetadataNotExistencePolicy";
import {MetadataSameTargetMultiUsagePolicy} from "../metatable/policies/MetadataSameTargetMultiUsagePolicy";


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
export type DecoratorFn = IFunction<void>;

/**
 * @public
 * @abstract
 * @class
 * @description - base class used to create custom decorators and perform decoration of class members
 */
export abstract class Decorator {

    /**
     * @public
     * @static
     * @method to build class member and parameter metadata from provided decorator [[Decorator]]
     * @return decorator function [[DecoratorFn]]
     */
    public static build(decorator: Decorator): DecoratorFn {

        return (...args: any[]): void => {
            const metadataTableClass: IMetadataClass<object> = this.buildClass(...args);
            const metadataDecorator: IMetatableDecorator = this.buildMetadataDecorator(decorator, ...args);

            if (metadataTableClass && metadataDecorator) {
                const metadataTableProvider: MetadataTableProvider = new MetadataTableProvider(metadataTableClass);
                metadataTableProvider.add(metadataDecorator);
            }
        };
    }

    /**
     * @private
     * @static
     * @method to get class with metadata table from descriptor arguments
     * @param args - arguments that contain target as first element of array
     * @return class with metadata table [[IMetadataClass]]
     */
    private static buildClass<T extends object>(...args: any[]): IMetadataClass<T> {
        const [target] = args;
        return MetadataObject.classOf(target);
    }

    /**
     * @private
     * @static
     * @method to build class metadata from provided data
     * @param decorator - decorator [[Decorator]] itself with metadata information
     * @param parameters - parameters that contain JS descriptor values (target, key, descriptor)
     * @return class member metadata [[IMetatableDecorator]]
     */
    private static buildMetadataDecorator<T extends object>(decorator: Decorator, ...parameters: any[]): IMetatableDecorator {
        const [target, name, descriptor] = parameters;

        const typedTarget: T = target;
        const classMemberName: string = name;
        const typedPropertyDescriptor: TypedPropertyDescriptor<unknown> = descriptor;

        // TODO handle error if not created
        Reflect.defineProperty(decorator, MetadataClassNames.METADATA, {
            configurable: false,
            enumerable: true,
            value: MetadataFactory.getMetadata(typedTarget, classMemberName, typedPropertyDescriptor),
            writable: false,
        });

        return decorator as IMetatableDecorator;
    }

    /**
     * @public
     * @method to get decorator parameters
     * @return readonly collection of parameters
     */
    public getParameters(): ReadonlyArray<unknown> {
        return [];
    }

    /**
     * @public
     * @method to get access policy [[MetadataAccessPolicy]] of decorator
     * @return  access policy value
     */
    public getAccessPolicy(): MetadataAccessPolicy {
        return MetadataAccessPolicy.ALL;
    }

    /**
     * @public
     * @method to get collision policy [[MetadataCollisionPolicy]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicy]]
     * @return collision policy value
     */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataCollisionPolicy {
        void (access);
        return MetadataCollisionPolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get not existence policy [[MetadataNotExistencePolicy]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicy]]
     * @return  not existence policy value
     */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataNotExistencePolicy {
        void (access);
        return MetadataNotExistencePolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get appearance policy [[MetadataAppearancePolicy]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicy]]
     * @return appearance policy value
     */
    public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataAppearancePolicy {
        void (access);
        return MetadataAppearancePolicy.DEFAULT;
    }

    /**
     * @public
     * @method to get same target usage policy [[MetadataSameTargetMultiUsagePolicy]] of decorator by access
     * @param access - primitive access policy [[PrimitiveMetadataAccessPolicy]]
     * @return same target usage policy value
     */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy = PrimitiveMetadataAccessPolicy.NONE): MetadataSameTargetMultiUsagePolicy {
        void (access);
        return MetadataSameTargetMultiUsagePolicy.DEFAULT;
    }
}

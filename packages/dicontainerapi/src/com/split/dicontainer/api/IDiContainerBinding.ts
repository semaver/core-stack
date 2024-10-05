import {IClass} from "@semaver/core";
import {DiClassFactory} from "../common/DiClassFactory";
import {DiInstanceFactory} from "../common/DiInstanceFactory";

/**
 * definition of generic IDiContainerBinding interface
 *
 * @public
 */
export interface IDiContainerBinding<T extends object> {

    /**
     * method to provide singleton binding if the bindable type is requested, should throw an error if the bindable type is interface
     * @public
     */
    toSingleton(): void;

    /**
     * method to provide singleton binding of the specified class if the bindable type is requested
     *
     * @public
     * @param targetClass - class that will be instantiated
     */
    toSingletonOf<K extends T>(targetClass: IClass<K>): void;

    /**
     * method to provide singleton binding of the specified value if the bindable type is requested

     * @public
     * @param targetValue  - instance of obejct that will be provided
     */
    toValue(targetValue: T): void;

    /**
     * method to provide every time new instance if the bindable type is requested, should throw an error if bindable type is interface
     *
     * @public
     */
    toNewInstance(): void;

    /**
     * method to provide every time new instance of specified class if the bindable type is requested
     *
     * @public
     * @param targetClass - class that will be instantiated
     */
    toNewInstanceOf<K extends T>(targetClass: IClass<K>): void;

    /**
     * method to provide an instance from specified factory if the bindable type is requested
     *
     * @public
     * @param factory - factory that returns instance
     */
    toInstanceFactory(factory: DiInstanceFactory<T>): void;

    /**
     * method to provide a singleton instance of class returned from specified factory if the bindable type is requested
     *
     * @public
     * @param factory - factory that returns class to instantiate, the instance after will be used in binding until factory return a new class
     */
    toSingletonClassFactory(factory: DiClassFactory<T>): void;

    /**
     * method to provide every time a new instance of class returned from specified factory if the bindable type is requested
     *
     * @public
     * @param factory - factory that returns class to instantiate
     */
    toNewInstanceClassFactory(factory: DiClassFactory<T>): void;

}

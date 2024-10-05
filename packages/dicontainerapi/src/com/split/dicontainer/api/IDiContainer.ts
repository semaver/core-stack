import {IInterface, InterfaceSymbol, IType, Nullable, Throwable} from "@semaver/core";
import {DependencyId} from "../common/DependencyId";
import {IDiContainerBinding} from "./IDiContainerBinding";

/**
 * interface symbol for interface IDiContainer
 *
 * @public
 */
export const IDiContainer: IInterface<IDiContainer> = InterfaceSymbol.for("IDiContainer");

/**
 * definition of generic IDiContainer interface,
 * TContainer - can be third-party implementation, in this case IDiContainer is used as Proxy or can be IDiContainer itself with own logic
 *
 * @public
 * @interface
  */
export interface IDiContainer<TContainer extends object = object> {

    /**
     * to create or get existing binding for given type class or interface
     *
     * @public
     * @param bindableType - given bindable type (class or interface)
     * @param id - optional dependency id, if not defined, default will be used
     * @returns generic binding for given type class or interface
     */
    binding<T extends object>(bindableType: IType<T>, id?: DependencyId): IDiContainerBinding<T>;

    /**
     * method to unbind specific bindable type (class or interface) with optional id
     *
     * @public
     * @param bindableType - given bindable type (class or interface)
     * @param id - optional dependency id, if not defined, default will be used
     * @returns instance of current diContainer
     */
    unbind<T extends object>(bindableType: IType<T>, id?: DependencyId): this;

    /**
     * method to unbind all registered bindings for all types
     *
     * @public
     * @returns instance of current diContainer
     */
    unbindAll(): this;

    /**
     * method to check if the current binding exists for given type class or interface
     *
     * @public
     * @returns true if binding found
     */
    hasBinding<T extends object>(bindableType: IType<T>, id?: DependencyId): boolean;

    /**
     * method to get an instance of class bound in binding to the current type
     *
     * @public
     * @param bindableType - given bindable type (class or interface)
     * @param id - optional dependency id, if not defined, default will be used
     * @returns injected instance of object or undefined
     */
    getInstance<T extends object>(bindableType: IType<T>, id?: DependencyId): Nullable<T>;

    /**
     * method to get an instance of class bound in binding to the current type or throw an error if not found
     *
     * @public
     * @param bindableType - given bindable type (class or interface)
     * @param id - optional dependency id, if not defined, default will be used
     * @returns injected instance od object or throw an error if not found
     */
    getInstanceOrThrow<T extends object>(bindableType: IType<T>, id?: DependencyId): Throwable<T>;

    /**
     * method to get dependency injected instance (constructor dependencies are NOT proceeded)
     *
     * @public
     * @param instance - initial instance of object
     * @returns injected instance of an object
     */
    fromInstance<T extends object>(instance: T): T;

    /**
     * method to get original di container if provided,
     * it can be third-party implementation, in this case method of original container can be used if necessary
     * or if it is IDiContainer itself the instance of current IDiContainer is returned
     *
     * @public
     * @returns instance of di container
     */
    getOrigin(): TContainer;
}

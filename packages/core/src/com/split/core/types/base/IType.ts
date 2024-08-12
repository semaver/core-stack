import {IInterface} from "./IInterface";
import {IClass} from "./IClass";

/**
 * definition of the generic type that is class or interface
 *
 * @public
 */
export type IType<T> = IClass<T> | IInterface<T>;

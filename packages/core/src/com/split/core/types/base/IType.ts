import {IInterface} from "./IInterface";
import {IClass} from "./IClass";

/**
 * @public
 * @interface type
 * @description - definition of generic type that is class [[IClass]] or interface [[IInterface]]
 */
export type IType<T> = IClass<T> | IInterface<T>;

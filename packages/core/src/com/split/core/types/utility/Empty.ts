import {Undefined} from "./Undefined";
import {Nullable} from "./Nullable";

/**
 * definition for the generic type that can be null or undefined
 *
 * @public
 */
export type Empty<T> = Nullable<T> | Undefined<T>;

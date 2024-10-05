import {IClass} from "@semaver/core";

/**
 * type of factory used in di binding to provide classes
 *
 * @public
 */
export type DiClassFactory<T> = () => IClass<T>;

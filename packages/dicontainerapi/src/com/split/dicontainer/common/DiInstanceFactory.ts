/**
 * type of factory used in di binding to provide instances of an object
 *
 * @public
 */
export type DiInstanceFactory<T> = () => T;

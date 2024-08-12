/**
 * definition for generic type that can throw an error
 *
 * @public
 * @interface type
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type Throwable<T> = T | never;

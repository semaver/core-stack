/**
 * @public
 * @interface type
 * @description - definition for generic type that can throw an error
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type Throwable<T> = T | never;

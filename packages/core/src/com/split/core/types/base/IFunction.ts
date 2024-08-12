/**
 * definition for generic typescript function
 *
 * @public
 * @interface type
 * @param args - any number of args that can be passed to the function
 * @returns - returned value of a generic type or void
 */
export type IFunction<TReturnType> = (...args: any[]) => TReturnType;

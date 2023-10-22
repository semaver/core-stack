/**
 * @public
 * @interface type
 * @description - definition for generic typescript function
 * @param args - any number of args that can be passed to the function
 * @return - returned value of generic type or void
 */
export type IFunction<TReturnType> = (...args: any[]) => TReturnType;

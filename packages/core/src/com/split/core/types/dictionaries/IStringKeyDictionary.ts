/**
 * @public
 * @interface
 * @description - definition for generic dictionary with string keys
 */
export interface IStringKeyDictionary<TValueType> {
    [key: string]: TValueType;
}

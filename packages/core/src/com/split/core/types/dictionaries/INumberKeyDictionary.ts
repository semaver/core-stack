/**
 * @public
 * @interface
 * @description - definition for generic dictionary with number keys
 */
export interface INumberKeyDictionary<TValueType> {
    [key: number]: TValueType;
}

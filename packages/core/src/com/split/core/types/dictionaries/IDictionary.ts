import {IStringKeyDictionary} from "./IStringKeyDictionary";
import {INumberKeyDictionary} from "./INumberKeyDictionary";

/**
 * @public
 * @interface type
 * @description - definition for common generic dictionary with string or number keys
 */
export type IDictionary<TValueType> =
    IStringKeyDictionary<TValueType>
    | INumberKeyDictionary<TValueType>;

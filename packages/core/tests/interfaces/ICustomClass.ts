import {IClass} from "../../src";

export interface ICustomClass<T = unknown> extends IClass<T> {
    __obj__: unknown;
    __cached_obj__: unknown;
}

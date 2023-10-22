import {QueryInfo} from "./QueryInfo";

/**
 * @public
 * @interface
 * @description - interface to define query condition api used to query/filter class members provided in query info [[QueryInfo]],
 * all conditions can be combined (chained)
 */
export interface IQueryCondition<T extends object> {

    /**
     * @public
     * @method to filter class members provided in query info [[QueryInfo]]
     * @param queryInfo - contains information about class members
     */
    filter(queryInfo: QueryInfo<T>): void;
}

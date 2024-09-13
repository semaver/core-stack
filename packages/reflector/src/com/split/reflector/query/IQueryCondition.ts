import {QueryInfo} from "./QueryInfo";

/**
 * interface to define query condition api used to query/filter class members provided in query info
 * all conditions can be combined (chained)
 *
 * @public
 * @interface
 */
export interface IQueryCondition<T extends object> {

    /**
     * method to perform filtering of class members provided in query info
     *
     * @public
     * @param queryInfo - query info that contains information about class members
     */
    filter(queryInfo: QueryInfo<T>): void;
}

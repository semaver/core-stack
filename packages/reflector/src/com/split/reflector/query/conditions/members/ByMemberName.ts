import {Nullable} from "@semaver/core";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * @public
 * @class
 * @implements [[IQueryCondition]]
 * @description - implementation of query condition api to filter class members by name (beware of obfuscation/minification level)
 */
export class ByMemberName<T extends object = object> implements IQueryCondition<T> {

    /**
     * @public
     * @static
     * @method to create query/filter condition (instance) form collection of class members names
     * @param memberNames - collection of class members names
     * @return instance of [[ByMemberName]] query condition
     */
    public static from<T extends object>(...memberNames: string[]): ByMemberName<T> {
        if (!ByMemberName._cache) {
            ByMemberName._cache = new ByMemberName<T>();
        }
        return ByMemberName._cache.setMemberNames(...memberNames);
    }

    /**
     * @private
     * @static
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByMemberName;
    /**
     * @private
     * @property _memberNames - collection of class members names used in query/filter condition
     */
    private _memberNames: Nullable<string[]>;

    /**
     * @public
     * @constructor
     * @param memberNames - collection of class members names used in query/filter condition
     */
    public constructor(...memberNames: string[]) {
        this.setMemberNames(...memberNames);
    }

    /**
     * @public
     * @method to set collection of class members names used in query/filter condition
     * @param memberNames - collection of class members names used in query/filter condition
     * @return current instance of query/filter condition
     */
    public setMemberNames(...memberNames: string[]): this {
        this._memberNames = memberNames;
        return this;
    }

    /**
     * @public
     * @method to perform filtering of class members provided in query info [[QueryInfo]]
     * @param queryInfo - query info [[QueryInfo]] that contains information about class members
     */
    public filter(queryInfo: QueryInfo<T>): void {
        queryInfo
            .filterMembers((member) =>
                this._memberNames?.find((memberName) =>
                    memberName === member.getName()));
    }

}

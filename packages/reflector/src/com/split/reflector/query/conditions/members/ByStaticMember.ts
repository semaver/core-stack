import {Nullable} from "@semaver/core";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * @public
 * @class
 * @implements [[IQueryCondition]]
 * @description - implementation of query condition api to filter class members by statics of class members (if member is static or not)
 */
export class ByStaticMember<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @static
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByStaticMember = new ByStaticMember<object>();
    /**
     * @private
     * @property _isStatic - statics flag
     */
    private _isStatic: Nullable<boolean>;

    /**
     * @public
     * @constructor
     * @param isStatic - statics flag
     */
    public constructor(isStatic?: boolean) {
        this.setIsStatic(isStatic);
    }

    /**
     * @public
     * @static
     * @method to create query/filter condition (instance) by statics
     * @param isStatic - statics flag
     * @return instance of [[ByStaticMember]] query condition
     */
    public static from<T extends object>(isStatic: boolean): ByStaticMember<T> {
        return ByStaticMember._cache.setIsStatic(isStatic);
    }

    /**
     * @public
     * @method to set statics flag used in query/filter condition
     * @param isStatic - statics flag
     * @return current instance of query/filter condition
     */
    public setIsStatic(isStatic?: boolean): this {
        this._isStatic = isStatic;
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
                member.isStatic() === this._isStatic);
    }

}

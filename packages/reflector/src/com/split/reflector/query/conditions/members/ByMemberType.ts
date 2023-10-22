import {Nullable} from "@semaver/core";
import {DecoratedElementType} from "../../../../metatable/types/DecoratedElementType";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * @public
 * @class
 * @implements [[IQueryCondition]]
 * @description - implementation of query condition api to filter class members by type [[DecoratedElementType]]
 */
export class ByMemberType<T extends object = object> implements IQueryCondition<T> {

    /**
     * @public
     * @static
     * @method to create query/filter condition (instance) form collection of class members types
     * @param memberTypes - collection of class members types
     * @return instance of [[ByMemberType]] query condition
     */
    public static from<T extends object>(...memberTypes: DecoratedElementType[]): ByMemberType<T> {
        if (!ByMemberType._cache) {
            ByMemberType._cache = new ByMemberType<T>();
        }
        return ByMemberType._cache.setMemberTypes(...memberTypes);
    }

    /**
     * @private
     * @static
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByMemberType;
    /**
     * @private
     * @property _memberTypes - collection of class members types used in query/filter condition
     */
    private _memberTypes: Nullable<DecoratedElementType[]>;

    /**
     * @public
     * @constructor
     * @param memberTypes - collection of class members types used in query/filter condition
     */
    public constructor(...memberTypes: DecoratedElementType[]) {
        this.setMemberTypes(...memberTypes);
    }

    /**
     * @public
     * @method to set collection of class members types used in query/filter condition
     * @param _memberTypes - collection of class members types used in query/filter condition
     * @return current instance of query/filter condition
     */
    public setMemberTypes(..._memberTypes: DecoratedElementType[]): this {
        this._memberTypes = _memberTypes;
        return this;
    }

    /**
     * @public
     * @method to perform filtering of class members provided in query info [[QueryInfo]]
     * @param queryInfo - query info [[QueryInfo]] that contains information about class members
     */
    public filter(queryInfo: QueryInfo<T>): void {
        // TODO update to bin ops
        queryInfo
            .filterMembers((member) =>
                this._memberTypes?.find((memberType) =>
                    !!(memberType & member.getType())));
    }

}

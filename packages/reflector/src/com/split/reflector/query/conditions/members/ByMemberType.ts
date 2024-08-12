import {DecoratedElementTypeValues} from "../../../../metatable/types/DecoratedElementEnum";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by type
 * @public
 */
export class ByMemberType<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByMemberType = new ByMemberType<object>();
    /**
     * @private
     * @property _memberTypes - collection of class members types used in query/filter condition
     */
    private _memberTypes: DecoratedElementTypeValues[] = [];

    /**
     * @public
     * @param memberTypes - collection of class members types used in query/filter condition
     */
    public constructor(...memberTypes: DecoratedElementTypeValues[]) {
        this.setMemberTypes(...memberTypes);
    }

    /**
     * method to create query/filter condition (instance) form collection of class members types
     *
     * @public
     * @param memberTypes - collection of class members types
     * @returns instance of query condition
     */
    public static from<T extends object>(...memberTypes: DecoratedElementTypeValues[]): ByMemberType<T> {
        return ByMemberType._cache.setMemberTypes(...memberTypes);
    }

    /**
     * method to set a collection of class members types used in query/filter condition
     *
     * @public
     * @param _memberTypes - collection of class members types used in query/filter condition
     * @returns current instance of query/filter condition
     */
    public setMemberTypes(..._memberTypes: DecoratedElementTypeValues[]): this {
        this._memberTypes = _memberTypes;
        return this;
    }

    /**
     * @inheritDoc
     */
    public filter(queryInfo: QueryInfo<T>): void {
        // TODO update to bin ops
        queryInfo
            .filterMembers((member) => {
                return this._memberTypes.some((memberType) =>
                    !!(memberType & member.getType()));
            });
    }

}

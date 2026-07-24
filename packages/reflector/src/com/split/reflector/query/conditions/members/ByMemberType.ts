import {DecoratedElementTypeValues} from "../../../../metatable/types/DecoratedElementEnum";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * query condition that keeps class members whose type matches any of the configured member types.
 * Member types are bit flags, so a member matches when its type shares any bit with a configured type,
 * and passing multiple types acts as a logical OR.
 *
 * @public
 */
export class ByMemberType<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static readonly _cache: ByMemberType = new ByMemberType<object>();
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
     * method to obtain a condition that keeps only members matching any of the given member types.
     * Note: this reuses a single shared cached instance instead of creating a new one, so each call overwrites
     * the member types configured by the previous call; use the constructor when an isolated, independently configured instance is needed.
     *
     * @public
     * @param memberTypes - collection of class members types
     * @returns the shared condition instance, reconfigured with the given member types
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

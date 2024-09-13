import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by name (beware of obfuscation/minification level)
 * @public
 */
export class ByMemberName<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByMemberName = new ByMemberName<object>();
    /**
     * @private
     * @property _memberNames - collection of class members names used in query/filter condition
     */
    private _memberNames: string[] = [];

    /**
     * @public
     * @param memberNames - collection of class members names used in query/filter condition
     */
    public constructor(...memberNames: string[]) {
        this.setMemberNames(...memberNames);
    }

    /**
     * method to create query/filter condition (instance) form a collection of class members names
     *
     * @public
     * @param memberNames - collection of class members names
     * @returns instance of query condition
     */
    public static from<T extends object>(...memberNames: string[]): ByMemberName<T> {
        return ByMemberName._cache.setMemberNames(...memberNames);
    }

    /**
     * method to set a collection of class members names used in query/filter condition
     *
     * @public
     * @param memberNames - collection of class members names used in query/filter condition
     * @returns current instance of query/filter condition
     */
    public setMemberNames(...memberNames: string[]): this {
        this._memberNames = memberNames;
        return this;
    }

    /**
     * @inheritDoc
     */
    public filter(queryInfo: QueryInfo<T>): void {
        queryInfo
            .filterMembers((member) => {
                return this._memberNames.some((memberName) =>
                    memberName === member.getName());
            });
    }

}

import {Empty} from "@semaver/core";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by statics of class members (if member is static or not)
 *
 * @public
 */
export class ByStaticMember<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByStaticMember = new ByStaticMember<object>();
    /**
     * @private
     * @property _isStatic - statics flag
     */
    private _isStatic: Empty<boolean>;

    /**
     * @public
     * @param isStatic - statics flag
     */
    public constructor(isStatic?: boolean) {
        this.setIsStatic(isStatic);
    }

    /**
     * method to create query/filter condition (instance) by statics
     *
     * @public
     * @param isStatic - statics flag
     * @returns instance of query condition
     */
    public static from<T extends object>(isStatic: boolean): ByStaticMember<T> {
        return ByStaticMember._cache.setIsStatic(isStatic);
    }

    /**
     * method to set a statics flag used in query/filter condition
     *
     * @public
     * @param isStatic - statics flag
     * @returns current instance of query/filter condition
     */
    public setIsStatic(isStatic?: boolean): this {
        this._isStatic = isStatic;
        return this;
    }

    /**
     * @inheritDoc
     */
    public filter(queryInfo: QueryInfo<T>): void {
        queryInfo
            .filterMembers((member) =>
                member.isStatic() === this._isStatic);
    }

}

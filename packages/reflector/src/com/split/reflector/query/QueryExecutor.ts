import {ClassMember} from "../members/ClassMember";
import {IQueryCondition} from "./IQueryCondition";
import {QueryDecoratorSelector} from "./QueryDecoratorSelector";
import {QueryInfo} from "./QueryInfo";
import {QueryMembersSelector} from "./QueryMembersSelector";

/**
 * class to perform filter and selection of class members and decorators
 *
 * @public
 */
export class QueryExecutor<T extends object> {

    /**
     * @private
     * @readonly
     * @property queryInfo - query info that contains information about selected class members
     */
    private readonly queryInfo: QueryInfo<T>;

    /**
     * @public
     * @param members - collection of class members
     */
    public constructor(members: ClassMember<T>[]) {
        this.queryInfo = new QueryInfo<T>(members);
    }

    /**
     * method to narrow the current set of class members by applying the given query condition; the condition filters the executor's shared query info in place, and multiple conditions can be chained.
     *
     * @public
     * @param condition - condition used to filter
     * @returns the same executor instance, allowing further conditions to be chained
     */
    public filter(condition: IQueryCondition<T>): this {
        condition.filter(this.queryInfo);
        return this;
    }

    /**
     * method to get instance of query member selector with provided filtered query info
     *
     * @public
     * @returns instance of query member selector, that allows selecting class members
     */
    public members(): QueryMembersSelector<T> {
        return new QueryMembersSelector(this.queryInfo);
    }

    /**
     * method to get instance of query decorator selector with provided filtered query info
     *
     * @public
     * @returns instance of query decorator selector, that allows to select full processed decorators from class members
     */
    public decorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, false);
    }

    /**
     * method to get a query decorator selector over the filtered class members that resolves only own decorators, i.e. those declared directly on each member, excluding decorators inherited from parent classes (unlike {@link decorators}, which returns the full inherited-and-own set).
     *
     * @public
     * @returns query decorator selector that selects only own decorators from the filtered class members
     */
    public ownDecorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, true);
    }

}

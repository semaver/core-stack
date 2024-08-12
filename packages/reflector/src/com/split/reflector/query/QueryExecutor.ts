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
     * @protected
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
     * method to filter class members based on provided condition
     *
     * @public
     * @param condition - condition used to filter
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
     * @returns instance of query decorator selector, that allows to select full proceeded decorators from class members
     */
    public decorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, false);
    }

    /**
     * method to get instance of query decorator selector with provided filtered query info
     *
     * @public
     * @returns instance of query decorator selector, that allows to select own decorators from class members
     */
    public ownDecorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, true);
    }

}

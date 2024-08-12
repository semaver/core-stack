import {ClassMember} from "../members/ClassMember";
import {IQueryCondition} from "./IQueryCondition";
import {QueryDecoratorSelector} from "./QueryDecoratorSelector";
import {QueryInfo} from "./QueryInfo";
import {QueryMembersSelector} from "./QueryMembersSelector";

/**
 * @public
 * @class
 * @description - class to perform filter and selection of class members and decorators
 */
export class QueryExecutor<T extends object> {

    /**
     * @protected
     * @readonly
     * @property queryInfo - query info, that contains information about selected class members
     */
    private readonly queryInfo: QueryInfo<T>;

    /**
     * @public
     * @constructor
     * @param members - collection of class members
     */
    public constructor(members: ClassMember<T>[]) {
        this.queryInfo = new QueryInfo<T>(members);
    }

    /**
     * @public
     * @method to filters class members based on provided condition
     * @param condition - condition [[IQueryCondition]] used to filter
     */
    public filter(condition: IQueryCondition<T>): this {
        condition.filter(this.queryInfo);
        return this;
    }

    /**
     * @public
     * @method to get instance of query member selector with provided filtered query info [[QueryInfo]]
     * @return instance of query member selector [[QueryMembersSelector]], that allows to select class members
     */
    public members(): QueryMembersSelector<T> {
        return new QueryMembersSelector(this.queryInfo);
    }

    /**
     * @public
     * @method to get instance of query decorator selector with provided filtered query info [[QueryInfo]]
     * @return instance of query decorator selector [[QueryDecoratorSelector]], that allows to select full proceeded decorators from class members
     */
    public decorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, false);
    }

    /**
     * @public
     * @method to get instance of query decorator selector with provided filtered query info [[QueryInfo]]
     * @return instance of query decorator selector [[QueryDecoratorSelector]], that allows to select own decorators from class members
     */
    public ownDecorators(): QueryDecoratorSelector<T> {
        return new QueryDecoratorSelector(this.queryInfo, true);
    }

}

import {classOfObject, IClass} from "@semaver/core";
import {Decorator} from "../../../../decorators/Decorator";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by provided decorator classes
 *
 * @public
 */
export class ByMemberDecoratorClass<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByMemberDecoratorClass = new ByMemberDecoratorClass<object>();
    /**
     * @private
     * @property _decoratorClasses - collection of decorator classes used in query/filter condition
     */
    private _decoratorClasses: IClass<Decorator>[] = [];

    /**
     * @public
     * @param decoratorClasses - collection of decorator classes used in query/filter condition
     */
    public constructor(...decoratorClasses: IClass<Decorator>[]) {
        this.setDecoratorClass(...decoratorClasses);
    }

    /**
     * method to create query/filter condition (instance) from a collection of decorator classes
     *
     * @public
     * @param decoratorClasses - collection of decorator classes
     * @returns instance of query condition
     */
    public static from<T extends object>(...decoratorClasses: IClass<Decorator>[]): ByMemberDecoratorClass<T> {
        return ByMemberDecoratorClass._cache.setDecoratorClass(...decoratorClasses);
    }

    /**
     * method to set a collection of decorator classes used in query/filter condition
     *
     * @public
     * @param decoratorClasses - collection of decorator classes used in query/filter condition
     * @returns current instance of query/filter condition
     */
    public setDecoratorClass(...decoratorClasses: IClass<Decorator>[]): this {
        this._decoratorClasses = decoratorClasses;
        return this;
    }

    /**
     * @inheritDoc
     */
    public filter(queryInfo: QueryInfo<T>): void {
        queryInfo
            .filterMembers((member) => {
                return member.getDecorators()
                    .some((decorator) => {
                        return this._decoratorClasses
                            .some((metadataClass) => metadataClass === classOfObject(decorator));
                    });
            });
    }

}

import {classOfObject, IClass} from "@semaver/core";
import {Decorator} from "../../../../decorators/Decorator";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by member-level decorator classes (parameter decorators are not considered)
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
     * method to obtain a query/filter condition that keeps members whose own member-level decorators include any of the given classes (parameter decorators are not considered).
     *
     * @public
     * @param decoratorClasses - collection of decorator classes
     * @remarks reuses a shared cached instance rather than creating a new one, so successive calls overwrite the previously configured decorator classes; use the constructor for an isolated instance.
     * @returns shared condition instance configured with the given decorator classes
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

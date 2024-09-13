import {classOfObject, IClass} from "@semaver/core";
import {Decorator} from "../../../../decorators/Decorator";
import {ExecutableMember} from "../../../members/ExecutableMember";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * implementation of query condition api to filter class members by provided decorator classes
 * used only for parameters in constructor and methods
 *
 * @public
 */
export class ByParameterDecoratorClass<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByParameterDecoratorClass = new ByParameterDecoratorClass<object>();
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
    public static from<T extends object>(...decoratorClasses: IClass<Decorator>[]): ByParameterDecoratorClass<T> {
        return ByParameterDecoratorClass._cache.setDecoratorClass(...decoratorClasses);
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
                if (member instanceof ExecutableMember) {
                    return member
                        .getParameterDecorators()
                        .reduce((result, decorators) => result.concat(...decorators), [])
                        .some((decorator) => !!this._decoratorClasses.find((decoratorClass) => decoratorClass === classOfObject(decorator)));

                } else {
                    return false;
                }
            });
    }

}

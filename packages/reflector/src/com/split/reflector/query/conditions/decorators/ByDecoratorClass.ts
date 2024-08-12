import {classOfObject, IClass} from "@semaver/core";
import {Decorator} from "../../../../decorators/Decorator";
import {ExecutableMember} from "../../../members/ExecutableMember";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * @public
 * @class
 * @implements [[IQueryCondition]]
 * @description - implementation of query condition api to filter class members by provided decorator classes
 */
export class ByDecoratorClass<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
     * @static
     * @property _cache - cache that contains instance of current query/filter condition
     * to prevent creation of instance every time this condition required (reusing of instance)
     */
    private static _cache: ByDecoratorClass = new ByDecoratorClass<object>();
    /**
     * @private
     * @property _decoratorClasses - collection of decorator classes
     */
    private _decoratorClasses: IClass<Decorator>[] = [];

    /**
     * @public
     * @constructor
     * @param decoratorClasses - ccollection of decorator classes used in query/filter condition
     */
    public constructor(...decoratorClasses: IClass<Decorator>[]) {
        this.setDecoratorClass(...decoratorClasses);
    }

    /**
     * @public
     * @static
     * @method to create query/filter condition from collection of decorator classes
     * @param decoratorClasses - collection of decorator classes
     * @return instance of [[ByDecoratorClass]] query condition
     */
    public static from<T extends object>(...decoratorClasses: IClass<Decorator>[]): ByDecoratorClass<T> {
        return ByDecoratorClass._cache.setDecoratorClass(...decoratorClasses);
    }

    /**
     * @public
     * @method to set collection of decorator classes used in query/filter condition
     * @param decoratorClasses - collection of decorator classes used in query/filter condition
     * @return current instance of query/filter condition
     */
    public setDecoratorClass(...decoratorClasses: IClass<Decorator>[]): this {
        this._decoratorClasses = decoratorClasses;
        return this;
    }

    /**
     * @public
     * @method to perform filtering of class members provided in query info [[QueryInfo]]
     * @param queryInfo - query info [[QueryInfo]] that contains information about class members
     */
    public filter(queryInfo: QueryInfo<T>): void {
        queryInfo
            .filterMembers((member) => {
                const decorators: Decorator[] = [];

                member.getDecorators().forEach((decorator) => {
                    decorators.push(decorator);
                });

                if (member instanceof ExecutableMember) {
                    member.getParameters().forEach((parameter) => {
                        decorators.push(...parameter.getDecorators());
                    });
                }
                return !!decorators.find((decorator) => this._decoratorClasses.some((decoratorClass) => decoratorClass === classOfObject(decorator)));
            });
    }
}

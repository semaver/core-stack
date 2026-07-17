import {classOfObject, IClass} from "@semaver/core";
import {Decorator} from "../../../../decorators/Decorator";
import {ExecutableMember} from "../../../members/ExecutableMember";
import {IQueryCondition} from "../../IQueryCondition";
import {QueryInfo} from "../../QueryInfo";

/**
 * query condition that keeps a class member when the member itself (or, for executable members,
 * any of its parameters) carries a decorator whose class exactly matches one of the given decorator
 * classes. Matching is by exact class identity (constructor equality, not `instanceof`), so
 * subclasses of a given decorator class do not match.
 * @public
 */
export class ByDecoratorClass<T extends object = object> implements IQueryCondition<T> {

    /**
     * @private
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
     * @param decoratorClasses - collection of decorator classes used in query/filter condition
     */
    public constructor(...decoratorClasses: IClass<Decorator>[]) {
        this.setDecoratorClass(...decoratorClasses);
    }

    /**
     * method to obtain a query/filter condition that keeps members carrying a decorator of any of
     * the given classes, matched either on the member itself or on its parameters (for executable
     * members).
     *
     * @public
     * @param decoratorClasses - collection of decorator classes
     * @remarks reuses a shared cached instance instead of creating a new one; each call overwrites
     * the previously configured decorator classes, so use the constructor when an isolated instance
     * is needed.
     * @returns shared query condition instance configured with the given decorator classes
     */
    public static from<T extends object>(...decoratorClasses: IClass<Decorator>[]): ByDecoratorClass<T> {
        return ByDecoratorClass._cache.setDecoratorClass(...decoratorClasses);
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

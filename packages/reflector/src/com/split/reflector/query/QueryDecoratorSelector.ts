/**
 * class to select metadata from class members defined in query info
 *
 * @public
 */
import {Decorator} from "../../decorators/Decorator";
import {ExecutableMember} from "../members/ExecutableMember";
import {QueryInfo} from "./QueryInfo";

export class QueryDecoratorSelector<T extends object> {

    /**
     * @protected
     * @readonly
     * @property queryInfo - query info that contains information about selected class members
     */
    protected readonly queryInfo: QueryInfo<T>;

    /**
     * @protected
     * @property useOwn - flag to select only own or full processed decorators
     */
    protected readonly useOwn: boolean;

    /**
     * @public
     * @param queryInfo - query info that contains information about selected class members
     * @param useOwn
     */
    public constructor(queryInfo: QueryInfo<T>, useOwn: boolean) {
        this.queryInfo = queryInfo;
        this.useOwn = useOwn;
    }

    /**
     * method to collect decorators from every selected class member, combining each member's own
     * decorators with the parameter decorators of executable members (constructor/methods) into a
     * single flat collection
     *
     * @public
     * @returns flat collection of all member-level and parameter decorators across the selected members
     */
    public all(): Decorator[] {
        const result: Decorator[] = [];

        this.queryInfo.forEachMember((member) => {
            const decorators: Decorator[] = [];

            (this.useOwn ? member.getOwnDecorators() : member.getDecorators())
                .forEach((value) => {
                    decorators.push(value);
                });

            if (member instanceof ExecutableMember) {
                (this.useOwn ? member.getOwnParameterDecorators() : member.getParameterDecorators())
                    .forEach((decorator) => {
                        decorators.push(...decorator);
                    });
            }

            decorators.forEach((decorator) => {
                result.push(decorator);
            });
        });

        return result;
    }

    /**
     * method to get all class members decorators from all class members
     *
     * @public
     * @returns collection of all class members decorators
     */
    public ofMembers(): Decorator[] {
        const result: Decorator[] = [];

        this.queryInfo.forEachMember((member) => {
            (this.useOwn ? member.getOwnDecorators() : member.getDecorators())
                .forEach((decorator) => {
                    result.push(decorator);
                });
        });

        return result;
    }

    /**
     * method to collect only the parameter decorators from the selected class members;
     * non-executable members (fields/accessors) contribute nothing since only executable members
     * (methods and constructors) have parameters
     *
     * @public
     * @returns flat collection of parameter decorators gathered from executable members only
     */
    public ofParameters(): Decorator[] {
        const result: Decorator[] = [];

        this.queryInfo.forEachMember((member) => {
            if (member instanceof ExecutableMember) {
                (this.useOwn ? member.getOwnParameterDecorators() : member.getParameterDecorators())
                    .forEach((decorators) => {
                        result.push(...decorators);
                    });
            }
        });

        return result;
    }
}

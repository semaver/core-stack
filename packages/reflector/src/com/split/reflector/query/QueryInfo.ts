import {Nullable} from "@semaver/core";
import {ClassMember} from "../members/ClassMember";

/**
 * @public
 * @class
 * @description - class that contains information about class members used to perform query
 */
export class QueryInfo<T extends object> {
    /**
     * @public
     * @property members - collection of class members
     */
    protected members: ClassMember<T>[];

    /**
     * @public
     * @constructor
     * @param members - collection of class members
     */
    public constructor(members: ClassMember<T>[]) {
        this.members = members ? members.slice() : [];
    }

    /**
     * @public
     * @method to get collection of class members
     * @return - collection of class members
     */
    public getMembers<K extends ClassMember<T> = ClassMember<T>>(): K[] {
        return this.members as K[];
    }

    /**
     * @public
     * @method to get class members from collection at index
     * @return - selected class members
     */
    public getMemberAt<K extends ClassMember<T> = ClassMember<T>>(index: number): Nullable<K> {
        return -1 < index && index < this.members.length ? this.members[index] as K : undefined;
    }

    /**
     * @public
     * @method to filters class members based on filterFn function
     * @param filterFn - filter function
     */
    public filterMembers(filterFn: (member: ClassMember<T>) => void): void {
        this.members = this.members.filter(filterFn);
    }

    /**
     * @public
     * @method to iterate class members using iteratorFn function
     * @param iteratorFn - iterator function
     */
    public forEachMember(iteratorFn: (member: ClassMember<T>) => void): void {
        this.members.forEach(iteratorFn);
    }
}

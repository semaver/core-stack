import {Empty} from "@semaver/core";
import {ClassMember} from "../members/ClassMember";

/**
 * class that contains information about class members used to perform the query
 * @public
 */
export class QueryInfo<T extends object> {
    /**
     * @public
     * @property members - collection of class members
     */
    protected members: ClassMember<T>[];

    /**
     * @public
     * @param members - collection of class members
     */
    public constructor(members: Empty<ClassMember<T>[]>) {
        this.members = members ? members.slice() : [];
    }

    /**
     * method to get a collection of class members
     *
     * @public
     * @returns - collection of class members
     */
    public getMembers<K extends ClassMember<T> = ClassMember<T>>(): K[] {
        return this.members as K[];
    }

    /**
     * method to get class members from a collection at index
     *
     * @public
     * @returns - selected class members
     */
    public getMemberAt<K extends ClassMember<T> = ClassMember<T>>(index: number): Empty<K> {
        return -1 < index && index < this.members.length ? this.members[index] as K : undefined;
    }

    /**
     * method to filters class members based on filterFn function
     *
     * @public
     * @param filterFn - filter function
     */
    public filterMembers(filterFn: (member: ClassMember<T>) => boolean): void {
        this.members = this.members.filter(filterFn);
    }

    /**
     * method to iterate class members using iteratorFn function
     *
     * @public
     * @param iteratorFn - iterator function
     */
    public forEachMember(iteratorFn: (member: ClassMember<T>) => void): void {
        this.members.forEach(iteratorFn);
    }
}

/**
 * class to select class members from query info
 * @public
 */
import {Nullable} from "@semaver/core";
import {ClassMember} from "../members/ClassMember";
import {QueryInfo} from "./QueryInfo";

export class QueryMembersSelector<T extends object> {
    /**
     * @protected
     * @readonly
     * @property queryInfo - query info that contains information about selected class members
     */
    protected readonly queryInfo: QueryInfo<T>;

    /**
     * @public
     * @param queryInfo - query info that contains information about selected class members
     */
    public constructor(queryInfo: QueryInfo<T>) {
        this.queryInfo = queryInfo;
    }

    /**
     * method to get all filtered class members from query info
     *
     * @public
     * @returns collection of filtered class members
     */
    public all<K extends ClassMember<T> = ClassMember<T>>(): K[] {
        return this.queryInfo.getMembers<K>();
    }

    /**
     * method to get a first accrued class member from the filtered collection of class members
     * @public
     * @returns first class member
     */
    public first<K extends ClassMember<T> = ClassMember<T>>(): Nullable<K> {
        return this.queryInfo.getMemberAt(0);
    }
}

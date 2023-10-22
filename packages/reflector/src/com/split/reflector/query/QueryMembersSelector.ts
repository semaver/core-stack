/**
 * @public
 * @class
 * @description - class to select class members from query info [[QueryInfo]]
 */
import {Nullable} from "@semaver/core";
import {ClassMember} from "../members/ClassMember";
import {QueryInfo} from "./QueryInfo";

export class QueryMembersSelector<T extends object> {
    /**
     * @protected
     * @readonly
     * @property queryInfo - query info, that contains information about selected class members
     */
    protected readonly queryInfo: QueryInfo<T>;

    /**
     * @public
     * @constructor
     * @param queryInfo - query info, that contains information about selected class members
     */
    public constructor(queryInfo: QueryInfo<T>) {
        this.queryInfo = queryInfo;
    }

    /**
     * @public
     * @method to get all filtered class members from query info
     * @return collection of filtered class members
     */
    public all<K extends ClassMember<T> = ClassMember<T>>(): K[] {
        return this.queryInfo.getMembers<K>();
    }

    /**
     * @public
     * @method to get first class member from filtered collection of class members
     */
    public first<K extends ClassMember<T> = ClassMember<T>>(): Nullable<K> {
        return this.queryInfo.getMemberAt(0);
    }
}

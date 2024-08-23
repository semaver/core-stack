import {IClass, isObjectClass, Empty} from "@semaver/core";
import {ClassMemberTargetObjectTypeError} from "../../errors/ClassMemberTargetObjectTypeError";
import {ClassMemberTargetUndefinedError} from "../../errors/ClassMemberTargetUndefinedError";
import {DecoratedElementEnum, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementEnum";
import {ClassMember} from "./ClassMember";

/**
 * abstract class that implement Field api and contains core functionality for field class members
 *
 * @public
 */
export abstract class Field<T extends object = object, TValue = unknown> extends ClassMember<T> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementEnum.FIELD;
    }

    /**
     * method to set a flag, that indicates if field is gettable
     *
     * @public
     * @returns true if field is gettable
     */
    public abstract isGettable(): boolean;

    /**
     * method to set a flag, that indicates if field is settable
     *
     * @public
     * @returns true if field is settable
     */
    public abstract isSettable(): boolean;

    /**
     * method to get the value of provided object
     *
     * @public
     * @param target - instance for instance fields or class for static fields
     * @returns value of the provided object
     */
    public abstract getValue(target: T): Empty<TValue>;

    /**
     * method to set value to the provided object
     *
     * @public
     * @param target - instance for instance fields or class for static fields
     * @param value - provided value to set
     */
    public abstract setValue(target: T, value: Empty<TValue>): void;

    /**
     * method to validate target before a set or get value;
     *
     * @protected
     * @param target - instance for instance fields or class for static fields
     */
    protected validate(target: Empty<IClass<T> | T>): void {
        if (!target) {
            throw new ClassMemberTargetUndefinedError(this, this.getType(), this._name);
        }

        if (isObjectClass(target) && !this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, true);
        }

        if (!isObjectClass(target) && this._isStatic) {
            throw new ClassMemberTargetObjectTypeError(this, this.getType(), this._name, target, false);
        }
    }
}

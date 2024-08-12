import {IClass, isObjectClass, Nullable} from "@semaver/core";
import {ClassMemberTargetObjectTypeError} from "../../errors/ClassMemberTargetObjectTypeError";
import {ClassMemberTargetUndefinedError} from "../../errors/ClassMemberTargetUndefinedError";
import {DecoratedElementType, DecoratedElementTypeValues} from "../../metatable/types/DecoratedElementType";
import {ClassMember} from "./ClassMember";

/**
 * @public
 * @abstract
 * @class
 * @extends [[ClassMember]]
 * @description - abstract class that implement Field api and contains core functionality for field class members
 */
export abstract class Field<T extends object = object, TValue = unknown> extends ClassMember<T> {

    /**
     * @inheritDoc
     */
    public getType(): DecoratedElementTypeValues {
        return DecoratedElementType.FIELD;
    }

    /**
     * @public
     * @abstract
     * @method to set flag, that indicates if field is gettable
     * @return true if field is gettable
     */
    public abstract isGettable(): boolean;

    /**
     * @public
     * @abstract
     * @method to set flag, that indicates if field is settable
     * @return true if field is settable
     */
    public abstract isSettable(): boolean;

    /**
     * @public
     * @abstract
     * @method to get value of provided object
     * @param target - instance for instance fields or class for static fields
     * @return value of provided object
     */
    public abstract getValue(target: T): Nullable<TValue>;

    /**
     * @public
     * @abstract
     * @method to set value to provided object
     * @param target - instance for instance fields or class for static fields
     * @param value - provided value to set
     */
    public abstract setValue(target: T, value: Nullable<TValue>): void;

    /**
     * @protected
     * @method to validate target before set or get value;
     * @param target - instance for instance fields or class for static fields
     */
    protected validate(target: Nullable<IClass<T> | T>): void {
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

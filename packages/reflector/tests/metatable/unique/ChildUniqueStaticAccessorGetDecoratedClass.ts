import {SuperUniqueStaticAccessorGetDecoratedClass} from "./SuperUniqueStaticAccessorGetDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticAccessorGetDecoratedClass extends SuperUniqueStaticAccessorGetDecoratedClass {
    protected static _propertyStatic: string = "aaaaa";
    public empty: string = "";

    @unique("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return this._propertyStatic;
    }
}

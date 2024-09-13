import {SuperUniqueInstanceAccessorGetDecoratedClass} from "./SuperUniqueInstanceAccessorGetDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceAccessorGetDecoratedClass extends SuperUniqueInstanceAccessorGetDecoratedClass {

    @unique("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._accessorNormalGet;
    }

}

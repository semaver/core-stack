import {SuperUniqueStaticAccessorGetDecoratedClass} from "./SuperUniqueStaticAccessorGetDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticAccessorGetDecoratedClass extends SuperUniqueStaticAccessorGetDecoratedClass {

    @unique("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return "aaaaa";
    }
}

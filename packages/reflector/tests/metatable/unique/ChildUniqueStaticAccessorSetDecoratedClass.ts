import {SuperUniqueStaticAccessorSetDecoratedClass} from "./SuperUniqueStaticAccessorSetDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticAccessorSetDecoratedClass extends SuperUniqueStaticAccessorSetDecoratedClass {

    @unique("accessor isStatic only set", 6)
    public static set accessorStaticSet(value: string) {
        void (value);
    }
}

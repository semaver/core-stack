import {SuperUniqueInstanceAccessorSetDecoratedClass} from "./SuperUniqueInstanceAccessorSetDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceAccessorSetDecoratedClass extends SuperUniqueInstanceAccessorSetDecoratedClass {

    @unique("accessor normal only set", 3)
    public set accessorNormalSet(value: string) {
        void (value);
    }
}

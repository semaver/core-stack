import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceAccessorSetDecoratedClass {

    @unique("accessor normal only set", 3)
    public set accessorNormalSet(value: string) {
        void (value);
    }
}

import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceAccessorGetDecoratedClass {

    @unique("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return "aaaaa";
    }
}

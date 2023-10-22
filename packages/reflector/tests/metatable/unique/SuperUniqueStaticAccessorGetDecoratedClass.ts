import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticAccessorGetDecoratedClass {

    @unique("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return "aaaaa";
    }
}

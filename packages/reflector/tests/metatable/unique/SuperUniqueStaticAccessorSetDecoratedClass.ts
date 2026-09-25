import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticAccessorSetDecoratedClass {

    @unique("accessor isStatic only set", 6)
    public static set accessorStaticSet(_value: string) {
        return;
    }

    public run(param: number): number {
        return param;
    }
}

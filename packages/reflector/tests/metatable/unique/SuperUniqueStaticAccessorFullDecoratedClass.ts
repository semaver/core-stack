import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticAccessorFullDecoratedClass {

    // @multi("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return "aaaaa";
    }

    @unique("accessor isStatic full set", 4)
    public static set accessorStaticFull(value: string) {
        void (value);
    }

    public run(param: number): number {
        return param;
    }
}

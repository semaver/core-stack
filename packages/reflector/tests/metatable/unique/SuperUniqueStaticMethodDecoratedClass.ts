import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticMethodDecoratedClass {

    @unique("method isStatic", 8)
    public static runStatic(param: string): number {
        void (param);
        return 0;
    }

    public run(param: number): number {
        return param;
    }
}

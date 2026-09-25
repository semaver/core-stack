import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticMethodArgsDecoratedClass {

    public static runStatic(@unique("param in isStatic method") _param: string): number {
        return 0;
    }

    public run(param: string): string {
        return param;
    }
}

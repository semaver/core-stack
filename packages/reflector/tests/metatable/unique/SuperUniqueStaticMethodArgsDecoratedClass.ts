import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticMethodArgsDecoratedClass {

    public static runStatic(@unique("param in isStatic method") param: string): number {
        void (param);
        return 0;
    }

    public run(param: string): string {
        return param;
    }
}

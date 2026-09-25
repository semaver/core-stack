import {SuperUniqueStaticMethodArgsDecoratedClass} from "./SuperUniqueStaticMethodArgsDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticMethodArgsDecoratedClass extends SuperUniqueStaticMethodArgsDecoratedClass {

    public static runStatic(@unique("param in isStatic method") _param: string): number {
        return 0;
    }
}

import {SuperUniqueStaticMethodDecoratedClass} from "./SuperUniqueStaticMethodDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticMethodDecoratedClass extends SuperUniqueStaticMethodDecoratedClass {

    @unique("method isStatic", 8)
    public static runStatic(param: string): number {
        void (param);
        return 0;
    }
}

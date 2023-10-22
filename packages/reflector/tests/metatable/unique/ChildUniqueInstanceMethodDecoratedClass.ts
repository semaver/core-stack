import {SuperUniqueInstanceMethodDecoratedClass} from "./SuperUniqueInstanceMethodDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceMethodDecoratedClass extends SuperUniqueInstanceMethodDecoratedClass {

    @unique("method normal", 11)
    public runNormal(param: string): number {
        void (param);
        return 0;
    }

}

import {SuperUniqueInstanceMethodDecoratedClass} from "./SuperUniqueInstanceMethodDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceMethodDecoratedClass extends SuperUniqueInstanceMethodDecoratedClass {

    @unique("method normal", 11)
    public runNormal(_param: string): number {
        return 0;
    }

}

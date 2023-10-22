import {SuperUniqueInstanceMethodArgsDecoratedClass} from "./SuperUniqueInstanceMethodArgsDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceMethodArgsDecoratedClass extends SuperUniqueInstanceMethodArgsDecoratedClass {

    public runNormal(@unique("param in normal method", 12)  param: string): number {
        void (param);
        return 0;
    }

}

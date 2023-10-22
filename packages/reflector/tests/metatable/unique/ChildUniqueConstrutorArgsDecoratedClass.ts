import {SuperUniqueConstructorArgsDecoratedClass} from "./SuperUniqueConstructorArgsDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueConstrutorArgsDecoratedClass extends SuperUniqueConstructorArgsDecoratedClass {

    public constructor(@unique("param in constructor", 10) param: string = "") {
        super(param);
    }
}

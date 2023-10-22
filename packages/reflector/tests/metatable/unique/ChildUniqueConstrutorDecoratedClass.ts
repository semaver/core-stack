import {SuperUniqueConstructorDecoratedClass} from "./SuperUniqueConstructorDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

@unique("class", 0)
export class ChildUniqueConstrutorDecoratedClass extends SuperUniqueConstructorDecoratedClass {

    public constructor(param: string = "") {
        super(param);
    }
}

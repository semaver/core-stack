import {ChildDecoratedClass} from "./ChildDecoratedClass";
import {standard} from "../../common/metadata/StandardDecorator";

@standard("ChildOfChildDecoratedClass")
export class ChildOfChildDecoratedClass extends ChildDecoratedClass {

    @standard("child of child prop normal", 9)
    public propertyChildOfChildNormal?: number;

    @standard("child of child method normal", 11)
    public runChildOfChildNormal(@standard("child of child param in normal method", 12) param: string): number {
        void (param);
        return 0;
    }
}

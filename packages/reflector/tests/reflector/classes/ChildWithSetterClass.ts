import {SuperWithGetterClass} from "./SuperWithGetterClass";
import {standard} from "../../common/metadata/StandardDecorator";

export class ChildWithSetterClass extends SuperWithGetterClass {
    @standard("")
    public set value(val: string) {
        void (val);
    }
}

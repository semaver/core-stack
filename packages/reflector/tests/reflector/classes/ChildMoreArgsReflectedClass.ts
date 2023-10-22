import {SuperReflectedClass} from "./SuperReflectedClass";
import {standard} from "../../common/metadata/StandardDecorator";

export class ChildMoreArgsReflectedClass extends SuperReflectedClass {

    public constructor(@standard("param in constructor", 10) param: string = "", extraParam: string = "") {
        void (extraParam);
        super(param);
    }

    @standard("method normal", 11)
    public runNormal(@standard("param in normal method", 12) param: string, extraParam: string = ""): number {
        void (extraParam);
        return 0;
    }
}

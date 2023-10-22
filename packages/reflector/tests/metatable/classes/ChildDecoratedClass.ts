import {SuperDecoratedClass} from "./SuperDecoratedClass";
import {standard} from "../../common/metadata/StandardDecorator";

@standard("ChildEmptyReflectedClass")
export class ChildDecoratedClass extends SuperDecoratedClass {

    public static runStaticHiddenNormal(): number {
        return 0;
    }

    @standard("child prop normal", 9)
    public propertyNormal?: number;

    @standard("child method normal", 11)
    public runNormal(@standard("child param in normal method", 12) param: number): number {
        void (param);
        return 0;
    }

    public runHiddenNormal(): number {
        console.log(this, "runHiddenNormal");
        return 0;
    }
}

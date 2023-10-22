import {SuperUniqueInstanceAccessorFullDecoratedClass} from "./SuperUniqueInstanceAccessorFullDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstanceAccessorFullDecoratedClass extends SuperUniqueInstanceAccessorFullDecoratedClass {

    // @multi("accessor normal full get")
    public get accessorNormalFull(): string {
        return "aaaaa";
    }

    @unique("accessor normal full set", 1)
    public set accessorNormalFull(value: string) {
        void (value);
    }

}

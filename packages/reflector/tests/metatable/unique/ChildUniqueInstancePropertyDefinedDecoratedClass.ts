import {SuperUniqueInstancePropertyDefinedDecoratedClass} from "./SuperUniqueInstancePropertyDefinedDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstancePropertyDefinedDecoratedClass extends SuperUniqueInstancePropertyDefinedDecoratedClass {

    @unique("prop normal defined", 9)
    public propertyDefNormal: number = 9;
}

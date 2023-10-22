import {SuperUniqueInstancePropertyUndefinedDecoratedClass} from "./SuperUniqueInstancePropertyUndefinedDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueInstancePropertyUndefinedDecoratedClass extends SuperUniqueInstancePropertyUndefinedDecoratedClass {

    @unique("prop normal undefined", 9)
    public propertyUndefNormal?: number;
}

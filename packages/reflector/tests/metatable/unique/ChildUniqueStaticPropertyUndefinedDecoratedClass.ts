import {SuperUniqueStaticPropertyUndefinedDecoratedClass} from "./SuperUniqueStaticPropertyUndefinedDecoratedClass";
import {unique} from "../../common/metadata/UniqueDecorator";

export class ChildUniqueStaticPropertyUndefinedDecoratedClass extends SuperUniqueStaticPropertyUndefinedDecoratedClass {

    @unique("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
}

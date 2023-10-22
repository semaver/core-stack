import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticPropertyUndefinedDecoratedClass {

    @unique("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
}

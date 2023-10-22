import {unique} from "../../common/metadata/UniqueDecorator";

class SuperUniqueStaticPropertyDefinedDecoratedClass {
}

export class ChildUniqueStaticPropertyDefinedDecoratedClass extends SuperUniqueStaticPropertyDefinedDecoratedClass {

    @unique("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;
}

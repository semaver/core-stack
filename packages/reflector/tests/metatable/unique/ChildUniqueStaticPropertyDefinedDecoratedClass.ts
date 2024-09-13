import {unique} from "../../common/metadata/UniqueDecorator";

class SuperUniqueStaticPropertyDefinedDecoratedClass {
    public run(param: number): number {
        return param;
    }
}

export class ChildUniqueStaticPropertyDefinedDecoratedClass extends SuperUniqueStaticPropertyDefinedDecoratedClass {

    @unique("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;
}

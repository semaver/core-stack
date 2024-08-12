import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueStaticPropertyDefinedDecoratedClass {

    @unique("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    public run(param: string): string {
        return param;
    }

}

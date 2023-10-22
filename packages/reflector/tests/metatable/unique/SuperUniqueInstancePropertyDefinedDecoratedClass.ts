import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstancePropertyDefinedDecoratedClass {

    @unique("prop normal defined", 9)
    public propertyDefNormal: number = 9;
}

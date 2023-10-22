import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstancePropertyUndefinedDecoratedClass {

    @unique("prop normal undefined", 9)
    public propertyUndefNormal?: number;
}

import {unique} from "../../common/metadata/UniqueDecorator";

@unique("class", 0)
export class SuperUniqueConstructorDecoratedClass {

    public constructor(param: string = "") {
        void (param);
    }
}

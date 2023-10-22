import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueConstructorArgsDecoratedClass {

    public constructor(@unique("param in constructor", 10) param: string = "") {
        void (param);
    }
}

import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceMethodArgsDecoratedClass {

    public runNormal(@unique("param in normal method", 12)  _param: string): number {
        return 0;
    }
}

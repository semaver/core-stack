import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueConstructorArgsDecoratedClass {
    public constructor(@unique("param in constructor", 10) _param: string = "") {
        return;
    }

    public run(param: string): string {
        return param;
    }
}

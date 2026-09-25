import {unique} from "../../common/metadata/UniqueDecorator";

@unique("class", 0)
export class SuperUniqueConstructorDecoratedClass {
    public constructor(_param: string = "") {
        return;
    }

    public run(param: number): number {
        return param;
    }
}

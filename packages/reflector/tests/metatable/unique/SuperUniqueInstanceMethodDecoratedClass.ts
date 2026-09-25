import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceMethodDecoratedClass {

    @unique("method normal", 11)
    public runNormal(_param: string): number {
        return 0;
    }
}

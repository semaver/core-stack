import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceMethodDecoratedClass {

    @unique("method normal", 11)
    public runNormal(param: string): number {
        void (param);
        return 0;
    }
}

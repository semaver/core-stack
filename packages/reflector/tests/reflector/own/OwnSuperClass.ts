import {reflect} from "../../../src";

@reflect()
export class OwnSuperClass {

    protected value1: number = 1;
    protected value2: string = "aaa";

    public constructor() {
        void (0);
    }

    @reflect()
    public get accessor1(): number {
        return this.value1;
    }

    public set accessor2(value: string) {
        this.value2 = value;
    }

    @reflect()
    public ownMethod(): void {
        void (0);
    }
}

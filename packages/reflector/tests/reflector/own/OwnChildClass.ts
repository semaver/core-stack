import {OwnSuperClass} from "./OwnSuperClass";
import {reflect} from "../../../src";

export class OwnChildClass extends OwnSuperClass {

    public constructor() {
        super();
    }

    @reflect()
    public set accessor1(value: number) {
        this.value1 = value;
    }

    @reflect()
    public get accessor2(): string {
        return this.value2;
    }

    public ownMethod(): void {
        super.ownMethod();
    }
}

import {AnotherTypeInterface} from "./AnotherTypeInterface";

export class AnotherType implements AnotherTypeInterface {
    public someMethod(): void {
        throw new Error("Method not implemented.");
    }
}

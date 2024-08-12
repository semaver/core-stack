import {standard} from "../../common/metadata/StandardDecorator";

export class SuperWithGetterClass {
    protected _value: string = "";

    @standard("")
    public get value(): string {
        return this._value;
    }
}

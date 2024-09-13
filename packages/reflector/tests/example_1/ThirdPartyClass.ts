import {SomeType} from "./SomeType";

export class ThirdPartyClass {

    public get thirdPartyProperty(): SomeType | undefined {
        return this._thirdPartyProperty;
    }

    public set thirdPartyProperty(value: SomeType | undefined) {
        this._thirdPartyProperty = value;
    }

    private _thirdPartyProperty: SomeType | undefined;
}

import {unique} from "../../common/metadata/UniqueDecorator";

export class SuperUniqueInstanceAccessorGetDecoratedClass {
    protected _accessorNormalGet: string = "aaaaa";

    @unique("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._accessorNormalGet;
    }
}

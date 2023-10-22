import {standard} from "../../common/metadata/StandardDecorator";

export class SuperWithGetterClass {
    @standard("")
    public get value(): string {
        return "";
    }
}

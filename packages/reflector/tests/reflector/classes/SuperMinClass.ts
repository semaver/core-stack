import {standard} from "../../common/metadata/StandardDecorator";

export class SuperMinClass {
    public constructor(@standard("mini") param: number) {
        console.log(this, param);
    }
}

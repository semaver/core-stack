import {standard} from "../../common/metadata/StandardDecorator";

export class SuperMin2Class {
    public constructor(@standard("mini1") param1: number, param2: number) {
        console.log(this, param1, param2);
    }
}

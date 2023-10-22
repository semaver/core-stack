import {ParamSuperClass} from "./ParamSuperClass";
import {param} from "../../common/metadata/ConstructorParameterDecorator";

export class ParamChildClass extends ParamSuperClass {
    public constructor(@param("someChildParam") someParam: string) {
        super(someParam);
    }
}

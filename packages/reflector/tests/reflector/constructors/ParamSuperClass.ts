import {param} from "../../common/metadata/ConstructorParameterDecorator";

export class ParamSuperClass {
    public constructor(@param("someSuperParam")someParam: string) {
        void (someParam);

    }
}

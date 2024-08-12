import {param} from "../../common/metadata/ConstructorParameterDecorator";

export class ParamSuperClass {
    public constructor(@param("someSuperParam") someParam: string) {
        void (someParam);

    }

    public run(@param("param in isStatic method") param: string): number {
        void (param);
        return 0;
    }
}

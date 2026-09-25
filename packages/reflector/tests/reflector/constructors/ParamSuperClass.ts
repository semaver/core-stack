import {param} from "../../common/metadata/ConstructorParameterDecorator";

export class ParamSuperClass {
    public constructor(@param("someSuperParam") _someParam: string) {
        return;
    }

    public run(@param("param in isStatic method") _param: string): number {
        return 0;
    }
}

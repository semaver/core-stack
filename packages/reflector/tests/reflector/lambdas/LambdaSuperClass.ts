import {standard} from "../../common/metadata/StandardDecorator";

export class LambdaSuperClass {

    public get uglyGetter(): boolean {
        return true;
    }

    @standard("some lambda static property")
    public static lambdaStaticProperty = (): void => {
        console.log("some lambdaStaticProperty");
    };

    public uglyProperty: number = 10;

    public uglyMethod(): void {
        void (0);
    }

    @standard("some lambda property")
    public lambdaProperty = (): void => {
        console.log("some lambda");
    };
}

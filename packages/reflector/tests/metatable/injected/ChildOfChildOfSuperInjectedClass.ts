import {ChildOfSuperInjectedClass} from "./ChildOfSuperInjectedClass";
import {DummyInjectorContainer} from "./DummyInjectorContainer";
import {injectDemo} from "../../common/metadata/InjectDemoDecorator";

export class ChildOfChildOfSuperInjectedClass extends ChildOfSuperInjectedClass {

    public constructor(@injectDemo(DummyInjectorContainer) container: DummyInjectorContainer) {
        super(container);
    }
}

import {SuperInjectedClass} from "./SuperInjectedClass";
import {DummyInjectorContainer} from "./DummyInjectorContainer";
import {injectDemo} from "../../common/metadata/InjectDemoDecorator";

export abstract class ChildOfSuperInjectedClass extends SuperInjectedClass {

    protected constructor(@injectDemo(DummyInjectorContainer) container: DummyInjectorContainer) {
        super(container);
    }
}

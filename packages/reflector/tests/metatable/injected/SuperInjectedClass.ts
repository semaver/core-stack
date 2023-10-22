import {DummyInjectorContainer} from "./DummyInjectorContainer";

export abstract class SuperInjectedClass {

    protected container?: DummyInjectorContainer;

    protected constructor(container?: DummyInjectorContainer) {
        this.container = container;
    }
}

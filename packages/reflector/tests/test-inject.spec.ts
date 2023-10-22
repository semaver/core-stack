import {ChildOfChildOfSuperInjectedClass} from "./metatable/injected/ChildOfChildOfSuperInjectedClass";
import {testQueries} from "./helpers/test-regular-queries-helper";
import {testOwnDecorators} from "./helpers/test-regular-decorators-helpers";

describe("Reflector API Inject test", () => {

    it("test injectable", () => {
        testOwnDecorators(ChildOfChildOfSuperInjectedClass, 0, 0, 1, 0, 0);
        testQueries(ChildOfChildOfSuperInjectedClass, 0, 0, 1, 1, 0, 1, 0);
    });
});

import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testAllDescriptors} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";
import {ParamSuperClass} from "./reflector/constructors/ParamSuperClass";
import {ParamChildClass} from "./reflector/constructors/ParamChildClass";

describe("Reflector API params metadata", () => {

    beforeAll(() => {
        testSuperAndChildInitialDescriptors(ParamSuperClass, ParamChildClass);
    });

    it("test params in super", () => {
        testAllDescriptors(ParamSuperClass, 0, 0, 1, 0, 0);
        testQueries(ParamSuperClass, 0, 0, 1, 1, 0, 1, 0);
    });

    it("test params in child", () => {
        testAllDescriptors(ParamChildClass, 0, 0, 1, 0, 0);
        testQueries(ParamChildClass, 0, 0, 1, 1, 0, 1, 0);
    });
});

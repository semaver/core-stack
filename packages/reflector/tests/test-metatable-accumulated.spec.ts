import {SuperAccumulatedDecoratedClass} from "./metatable/accumulated/SuperAccumulatedDecoratedClass";
import {ChildAccumulatedDecoratedClass} from "./metatable/accumulated/ChildAccumulatedDecoratedClass";
import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testAllDescriptors} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";

describe("Reflector API accumulated metadata", () => {

    beforeAll(() => {
        testSuperAndChildInitialDescriptors(SuperAccumulatedDecoratedClass, ChildAccumulatedDecoratedClass);
    });

    it("test accumulated in super", () => {
        testAllDescriptors(SuperAccumulatedDecoratedClass, 6, 5, 6, 1, 4);
        testQueries(SuperAccumulatedDecoratedClass, 6, 5, 6, 1, 4, 1, 5);
    });

    it("test accumulated in child", () => {
        testAllDescriptors(ChildAccumulatedDecoratedClass, 9, 8, 10, 2, 7);
        testQueries(ChildAccumulatedDecoratedClass, 6, 5, 6, 1, 4, 1, 9);
    });
});

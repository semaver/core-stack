import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testAllDescriptors} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";
import {SuperSkippedDecoratedClass} from "./metatable/skiped/SuperSkippedDecoratedClass";
import {FullChildSkippedDecoratedClass} from "./metatable/skiped/FullChildSkippedDecoratedClass";
import {EmptyChildSkippedDecoratedClass} from "./metatable/skiped/EmptyChildSkippedDecoratedClass";
import {EmptyChildOfEmptyChildSkippedDecoratedClass} from "./metatable/skiped/EmptyChildOfEmptyChildSkippedDecoratedClass";
import {FullChildOfEmptyChildSkippedDecoratedClass} from "./metatable/skiped/FullChildOfEmptyChildSkippedDecoratedClass";
import {FullChildOfFullChildSkippedDecoratedClass} from "./metatable/skiped/FullChildOfFullChildSkippedDecoratedClass";
import {EmptyChildOfFullChildSkippedDecoratedClass} from "./metatable/skiped/EmptyChildOfFullChildSkippedDecoratedClass";

describe("Reflector API skipped metadata", () => {

    beforeAll(() => {
        testSuperAndChildInitialDescriptors(SuperSkippedDecoratedClass, FullChildSkippedDecoratedClass);
        testSuperAndChildInitialDescriptors(SuperSkippedDecoratedClass, EmptyChildSkippedDecoratedClass);

        testSuperAndChildInitialDescriptors(EmptyChildSkippedDecoratedClass, EmptyChildOfEmptyChildSkippedDecoratedClass);
        testSuperAndChildInitialDescriptors(EmptyChildSkippedDecoratedClass, FullChildOfEmptyChildSkippedDecoratedClass);

        testSuperAndChildInitialDescriptors(FullChildSkippedDecoratedClass, EmptyChildOfFullChildSkippedDecoratedClass);
        testSuperAndChildInitialDescriptors(FullChildSkippedDecoratedClass, FullChildOfFullChildSkippedDecoratedClass);
    });

    it("test skipped in super", () => {
        testAllDescriptors(SuperSkippedDecoratedClass, 6, 5, 6, 1, 4);
        testQueries(SuperSkippedDecoratedClass, 6, 5, 6, 1, 4, 1, 5);
    });

    it("test skipped in full child", () => {
        testAllDescriptors(FullChildSkippedDecoratedClass, 3, 2, 2, 0, 1);
        testQueries(FullChildSkippedDecoratedClass, 3, 2, 2, 1, 1, 1, 1);

    });

    it("test skipped in empty child", () => {
        testAllDescriptors(EmptyChildSkippedDecoratedClass, 0, 0, 0, 0, 0);
        testQueries(EmptyChildSkippedDecoratedClass, 0, 0, 0, 0, 0, 0, 0);

    });

    it("test skipped in empty of empty child", () => {
        testAllDescriptors(EmptyChildOfEmptyChildSkippedDecoratedClass, 0, 0, 0, 0, 0);
        testQueries(EmptyChildOfEmptyChildSkippedDecoratedClass, 0, 0, 0, 0, 0, 0, 0);
    });

    it("test skipped in full of empty child", () => {
        testAllDescriptors(FullChildOfEmptyChildSkippedDecoratedClass, 3, 2, 2, 0, 1);
        testQueries(FullChildOfEmptyChildSkippedDecoratedClass, 3, 2, 2, 1, 1, 1, 1);
    });

    it("test skipped in empty of full child", () => {
        testAllDescriptors(EmptyChildOfFullChildSkippedDecoratedClass, 0, 0, 0, 0, 0);
        testQueries(EmptyChildOfFullChildSkippedDecoratedClass, 0, 0, 0, 0, 0, 0, 0);
    });

    it("test skipped in full of full child", () => {
        testAllDescriptors(FullChildOfFullChildSkippedDecoratedClass, 3, 2, 2, 0, 1);
        testQueries(FullChildOfFullChildSkippedDecoratedClass, 3, 2, 2, 1, 1, 1, 1);
    });
});

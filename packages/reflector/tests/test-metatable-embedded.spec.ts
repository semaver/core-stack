import {EmbeddedSuperClass} from "./metatable/embedded/EmbeddedSuperClass";
import {EmbeddedEmptyChildClass} from "./metatable/embedded/EmbeddedEmptyChildClass";
import {EmbeddedFullChildClass} from "./metatable/embedded/EmbeddedFullChildClass";
import {testSuperAndChildInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testAllDescriptors, testOwnDecorators} from "./helpers/test-regular-decorators-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";

describe("Reflector API embedded metadata", () => {

    beforeAll(() => {
        testSuperAndChildInitialDescriptors(EmbeddedSuperClass, EmbeddedEmptyChildClass);
        testSuperAndChildInitialDescriptors(EmbeddedSuperClass, EmbeddedFullChildClass);
    });

    it("test embedded in super", () => {
        testOwnDecorators(EmbeddedSuperClass, 0, 0, 3, 0, 1);
        testAllDescriptors(EmbeddedSuperClass, 0, 0, 3, 0, 1);
        testQueries(EmbeddedSuperClass, 0, 0, 3, 1, 2, 1, 2);
    });

    it("test embedded in emptyCall child with merge", () => {
        testAllDescriptors(EmbeddedEmptyChildClass, 0, 0, 3, 0, 1);
        testQueries(EmbeddedEmptyChildClass, 0, 0, 3, 1, 2, 1, 2);
    });

    it("test embedded in emptyCall child", () => {
        testOwnDecorators(EmbeddedEmptyChildClass, 0, 0, 0, 0, 0);
        testQueries(EmbeddedEmptyChildClass, 0, 0, 0, 1, 2, 1, 2);
    });

    it("test embedded in full child", () => {
        testOwnDecorators(EmbeddedFullChildClass, 0, 0, 3, 0, 1);
        testQueries(EmbeddedFullChildClass, 0, 0, 3, 1, 2, 1, 2);
    });

    it("test embedded in full child with merge", () => {
        testAllDescriptors(EmbeddedFullChildClass, 0, 0, 3, 0, 1);
        testQueries(EmbeddedFullChildClass, 0, 0, 3, 1, 2, 1, 2);
    });
});

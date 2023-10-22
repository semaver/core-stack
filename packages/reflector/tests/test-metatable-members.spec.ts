import {SuperDecoratedClass} from "./metatable/classes/SuperDecoratedClass";
import {testClassInitialDescriptors} from "./helpers/test-before-decorators-helpers";
import {testOwnDecorators} from "./helpers/test-regular-decorators-helpers";
import {
    testOwnAccessors,
    testOwnArguments,
    testOwnConstructors,
    testOwnMethods,
    testOwnProperties,
} from "./helpers/test-regular-decorators-parts-helpers";
import {testQueries} from "./helpers/test-regular-queries-helper";

describe("Reflector API Basic Members Test", () => {

    beforeAll(() => {
        testClassInitialDescriptors(SuperDecoratedClass);
    });

    it("test members count", () => {
        testOwnDecorators(SuperDecoratedClass, 6, 5, 6, 1, 4);
        testQueries(SuperDecoratedClass, 6, 5, 6, 1, 4, 1, 5);
    });

    it("test accessors", () => {
        testOwnAccessors(SuperDecoratedClass, 6, 3, 3);
    });

    it("test properties", () => {
        testOwnProperties(SuperDecoratedClass, 5, 2, 3);
    });

    it("test arguments", () => {
        testOwnArguments(SuperDecoratedClass, 6, 1, 4, 1);
    });

    it("test constructors", () => {
        testOwnConstructors(SuperDecoratedClass, 1);
    });

    it("test methods", () => {
        testOwnMethods(SuperDecoratedClass, 4, 1, 3);
    });

});

import {SuperNonMultiDecoratedClass} from "./metatable/classes/SuperNonMultiDecoratedClass";
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

describe("Reflector API Basic Members Non Multi Usage Test", () => {

    beforeAll(() => {
        testClassInitialDescriptors(SuperNonMultiDecoratedClass);
    });

    it("test members count", () => {
        testOwnDecorators(SuperNonMultiDecoratedClass, 6, 5, 6, 1, 4);
        testQueries(SuperNonMultiDecoratedClass, 6, 5, 6, 1, 4, 1, 5);
    });

    it("test accessors", () => {
        testOwnAccessors(SuperNonMultiDecoratedClass, 6, 3, 3);
    });

    it("test properties", () => {
        testOwnProperties(SuperNonMultiDecoratedClass, 5, 2, 3);
    });

    it("test arguments", () => {
        testOwnArguments(SuperNonMultiDecoratedClass, 6, 1, 4, 1);
    });

    it("test constructors", () => {
        testOwnConstructors(SuperNonMultiDecoratedClass, 1);
    });

    it("test methods", () => {
        testOwnMethods(SuperNonMultiDecoratedClass, 4, 1, 3);
    });

});

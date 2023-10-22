import {SuperMultiDecoratedClass} from "./metatable/classes/SuperMultiDecoratedClass";
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

describe("Reflector API Basic Members Multi Usage Test", () => {

    beforeAll(() => {
        testClassInitialDescriptors(SuperMultiDecoratedClass);
    });

    it("test members count", () => {
        testOwnDecorators(SuperMultiDecoratedClass, 12, 10, 12, 2, 8);
        testQueries(SuperMultiDecoratedClass, 6, 5, 6, 1, 4, 2, 10);
    });

    it("test accessors", () => {
        testOwnAccessors(SuperMultiDecoratedClass, 12, 6, 6);
    });

    it("test properties", () => {
        testOwnProperties(SuperMultiDecoratedClass, 10, 4, 6);
    });

    it("test arguments", () => {
        testOwnArguments(SuperMultiDecoratedClass, 12, 2, 8, 2);
    });

    it("test constructors", () => {
        testOwnConstructors(SuperMultiDecoratedClass, 2);
    });

    it("test methods", () => {
        testOwnMethods(SuperMultiDecoratedClass, 8, 2, 6);
    });

});

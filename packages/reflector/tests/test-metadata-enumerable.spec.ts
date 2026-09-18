import {
    ClassTableNames,
    MetadataClassNames,
    Reflector,
} from "../src";
import {Empty} from "@semaver/core";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";

/**
 * Regression tests for the non-enumerable service keys fix.
 *
 * The engine stores its bookkeeping (metadata table, caches, hashes, global
 * class table) as own properties on constructors / globalThis, keyed by
 * cross-realm global symbols ({@link Symbol.for}). Keying by symbol already
 * keeps them out of `Object.keys`, `for..in` and JSON serialization; on top of
 * that the descriptors are defined with `enumerable: false` so they also stay
 * out of object spread (`{...target}`) and `Object.assign`, which DO copy
 * enumerable *symbol* keys. They must, however, remain readable via
 * `Reflect.ownKeys` / `Reflect.has` (which is how the engine itself reads them).
 */
describe("Reflector service keys are non-enumerable", () => {
    const storage: object = globalThis;

    const serviceKeys: symbol[] = [
        MetadataClassNames.METADATA,
        MetadataClassNames.CACHED_METADATA,
        MetadataClassNames.OWN_HASH,
        MetadataClassNames.PARENT_HASH,
    ];

    beforeAll(() => {
        // force metadata materialization on the target class
        Reflector.from(SuperReflectedClass).getDecoratedMembers();
    });

    it("materializes the metadata key on the class", () => {
        expect(Reflect.ownKeys(SuperReflectedClass).includes(MetadataClassNames.METADATA)).toBeTruthy();
    });

    it("defines every service key as a non-enumerable own symbol", () => {
        serviceKeys.forEach((key: symbol) => {
            const descriptor: Empty<PropertyDescriptor> = Reflect.getOwnPropertyDescriptor(SuperReflectedClass, key);
            expect(descriptor).toBeDefined();
            expect(descriptor?.enumerable).toBe(false);
        });
    });

    it("does not leak service keys into spread / Object.assign", () => {
        // Object.assign (and object spread) copy *enumerable* own keys, including
        // enumerable symbol keys — so a non-enumerable symbol must NOT be copied.
        const copiedSymbols: symbol[] = Object.getOwnPropertySymbols(Object.assign({}, SuperReflectedClass));
        serviceKeys.forEach((key: symbol) => {
            expect(copiedSymbols).not.toContain(key);
        });
    });

    it("keeps service keys reachable via Reflect for the engine", () => {
        expect(Reflect.has(SuperReflectedClass, MetadataClassNames.METADATA)).toBeTruthy();
        expect(Reflect.get(SuperReflectedClass, MetadataClassNames.METADATA)).toBeDefined();
    });

    it("stores the global class table as a non-enumerable symbol on globalThis", () => {
        // reachable for the engine...
        expect(Reflect.has(storage, ClassTableNames.CLASS_TABLE)).toBeTruthy();
        // ...but not copied by spread / Object.assign
        const copiedSymbols: symbol[] = Object.getOwnPropertySymbols(Object.assign({}, storage));
        expect(copiedSymbols).not.toContain(ClassTableNames.CLASS_TABLE);
    });
});

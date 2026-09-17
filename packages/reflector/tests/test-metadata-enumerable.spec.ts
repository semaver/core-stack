import {
    ClassTableNames,
    MetadataClassNames,
    Reflector,
} from "../src";
import {SuperReflectedClass} from "./reflector/classes/SuperReflectedClass";

/**
 * Regression tests for the non-enumerable service keys fix.
 *
 * The engine stores its bookkeeping (metadata table, caches, hashes, global
 * class table) as own properties on constructors / globalThis. These MUST NOT
 * be enumerable, otherwise they leak into `Object.keys`, `for..in`, object
 * spread and naive JSON serializers. They must, however, remain readable via
 * `Reflect.ownKeys` / `Reflect.has` (which is how the engine itself reads them).
 */
describe("Reflector service keys are non-enumerable", () => {
    const storage: object = globalThis;

    beforeAll(() => {
        // force metadata materialization on the target class
        Reflector.from(SuperReflectedClass).getDecoratedMembers();
    });

    it("materializes the metadata key on the class", () => {
        expect(Reflect.ownKeys(SuperReflectedClass).includes(MetadataClassNames.METADATA)).toBeTruthy();
    });

    it("does not leak service keys into Object.keys / for..in / spread", () => {
        const serviceKeys: string[] = [
            MetadataClassNames.METADATA,
            MetadataClassNames.CACHED_METADATA,
            MetadataClassNames.OWN_HASH,
            MetadataClassNames.PARENT_HASH,
        ];

        const enumerableKeys: string[] = Object.keys(SuperReflectedClass);
        serviceKeys.forEach((key: string) => {
            expect(enumerableKeys).not.toContain(key);
        });

        const forInKeys: string[] = [];
        for (const key in SuperReflectedClass) {
            forInKeys.push(key);
        }
        serviceKeys.forEach((key: string) => {
            expect(forInKeys).not.toContain(key);
        });

        // Object.assign copies enumerable own properties, exactly like object
        // spread would — but without spreading a class declaration (which eslint
        // forbids and which would only copy static props anyway).
        const spreadKeys: string[] = Object.keys(Object.assign({}, SuperReflectedClass));
        serviceKeys.forEach((key: string) => {
            expect(spreadKeys).not.toContain(key);
        });
    });

    it("keeps service keys reachable via Reflect for the engine", () => {
        expect(Reflect.has(SuperReflectedClass, MetadataClassNames.METADATA)).toBeTruthy();
        expect(Reflect.get(SuperReflectedClass, MetadataClassNames.METADATA)).toBeDefined();
    });

    it("does not leak the global class table into Object.keys(globalThis)", () => {
        // reachable for the engine...
        expect(Reflect.has(storage, ClassTableNames.CLASS_TABLE)).toBeTruthy();
        // ...but invisible to enumeration
        expect(Object.keys(storage)).not.toContain(ClassTableNames.CLASS_TABLE);
    });
});

import {Empty} from "@semaver/core";
import {
    ClassTableNames,
    ClassTableProtocolMismatchError,
    ClassTableProvider,
    CLASS_TABLE_PROTOCOL_VERSION,
    IClassTableRef,
} from "../src";

/**
 * Regression test for the versioned global class table.
 *
 * The class table lives on a single cross-realm symbol shared by every copy of
 * the library that resolves the same {@link Symbol.for}. A copy that finds a
 * table stamped with a different `_protocol_version` (an incompatible storage
 * layout written by another copy) must fail fast rather than silently trust a
 * layout it may not understand.
 *
 * The real table lives on the process-global `globalThis` under a
 * non-configurable symbol, so it cannot be reset between tests. To exercise the
 * version check in isolation we inject a fresh storage object into
 * {@link ClassTableProvider} instead of relying on the shared global.
 */
describe("Reflector global class table protocol version", () => {

    it("throws when an existing class table has an incompatible protocol version", () => {
        const storage: object = {};
        const staleRef: IClassTableRef = {
            _protocol_version: CLASS_TABLE_PROTOCOL_VERSION + 1,
            _sync_hash: "",
            _classes: new Set(),
            _subscribers: new Set(),
        };
        Reflect.defineProperty(storage, ClassTableNames.CLASS_TABLE, {
            configurable: false,
            enumerable: false,
            value: staleRef,
            writable: false,
        });

        let caught: Empty<Error>;
        try {
            new ClassTableProvider(storage);
        } catch (e) {
            caught = e as Error;
        }

        expect(caught).toBeInstanceOf(ClassTableProtocolMismatchError);
        const message: string = caught?.message ?? "";
        expect(message).toContain("protocol version mismatch");
        expect(message).toContain(String(CLASS_TABLE_PROTOCOL_VERSION + 1));
        expect(message).toContain(String(CLASS_TABLE_PROTOCOL_VERSION));
    });

    it("does not throw when the protocol version matches", () => {
        const storage: object = {};
        const compatibleRef: IClassTableRef = {
            _protocol_version: CLASS_TABLE_PROTOCOL_VERSION,
            _sync_hash: "",
            _classes: new Set(),
            _subscribers: new Set(),
        };
        Reflect.defineProperty(storage, ClassTableNames.CLASS_TABLE, {
            configurable: false,
            enumerable: false,
            value: compatibleRef,
            writable: false,
        });

        expect(() => new ClassTableProvider(storage)).not.toThrow();
    });

    it("creates a fresh table stamped with the current protocol version", () => {
        const storage: object = {};
        new ClassTableProvider(storage);

        const ref: Empty<IClassTableRef> = Reflect.get(storage, ClassTableNames.CLASS_TABLE) as Empty<IClassTableRef>;
        expect(ref).toBeDefined();
        expect(ref?._protocol_version).toBe(CLASS_TABLE_PROTOCOL_VERSION);
    });
});

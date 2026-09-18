import {ExtendedError} from "@semaver/core";

/**
 * custom error thrown when a copy of the library finds a global class table that was
 * stamped with an incompatible {@link CLASS_TABLE_PROTOCOL_VERSION}, i.e. another,
 * incompatible copy of `@semaver/reflector` created the shared class table using a
 * storage layout this copy may not understand. Surfacing it (instead of silently
 * reading the unknown layout) prevents runtime errors and corruption of the shared registry.
 *
 * @public
 */
export class ClassTableProtocolMismatchError extends ExtendedError {

    /**
     * @public
     * @param target - class table provider where the error is thrown
     * @param found - the protocol version found on the existing global class table
     * @param expected - the protocol version this copy of the library expects
     */
    public constructor(target: object, found: number, expected: number) {
        super(target, `global class table protocol version mismatch: found ${String(found)}, expected ${String(expected)}. Multiple incompatible copies of @semaver/reflector may be loaded.`);
    }
}

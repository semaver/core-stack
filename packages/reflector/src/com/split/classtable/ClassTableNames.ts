/**
 * cross-realm global symbol (`Symbol.for`) backing the class table name.
 *
 * declared with an explicit `unique symbol` type (and consumed through `typeof`
 * in {@link ClassTableNamesType}) so it stays a distinct, named property key
 * rather than widening to a plain `symbol`.
 */
const CLASS_TABLE: unique symbol = Symbol.for("@semaver/reflector/class_table");

/**
 * shape of the class table names holder
 *
 * @public
 * @interface
 */
export interface ClassTableNamesType {
    readonly CLASS_TABLE: typeof CLASS_TABLE;
}

/**
 * union of the class table name key values (the `Symbol.for`-backed
 * property key) held by `ClassTableNames`.
 *
 * @public
 */
export type ClassTableNamesValues = ClassTableNamesType[keyof ClassTableNamesType];

/**
 * class table names used to define class table properties.
 *
 * the key is a cross-realm global symbol (`Symbol.for`) rather than a raw
 * string: every copy of the library resolves the same shared symbol, so the
 * global class table stays a single rendezvous point across duplicate installs
 * (multiple package copies, micro-frontends, HMR) while being invisible to
 * string-key enumeration and immune to name collisions.
 *
 * @public
 * @enum
 */
export const ClassTableNames: ClassTableNamesType = Object.freeze({
    CLASS_TABLE,
});

/**
 * version of the global class table storage FORMAT (not the package semver).
 *
 * bump only when the shape of {@link IClassTableRef} changes in a way that a
 * previous library copy could not read. copies that share one globalThis but
 * stamp different values are reported via console.warn.
 *
 * @public
 */
export const CLASS_TABLE_PROTOCOL_VERSION: number = 1;

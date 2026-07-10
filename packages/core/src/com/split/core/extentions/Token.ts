/**
 * per-module-load seed to disambiguate tokens across independently-bundled
 * copies (micro-frontends / multiple realms). The monotonic counter below is
 * the load-bearing uniqueness guarantee within a single running process.
 *
 * @internal
 */
const seed: string = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/**
 * monotonic counter; increments once per generated token.
 *
 * @internal
 */
let sequence: number = 0;

/**
 * function to generate a unique, human-readable string token
 *
 * the token is unique within a single running process and is intended for
 * internal identity/versioning compared only with strict equality; it is not
 * cryptographic, not persisted and not a stable format contract
 *
 * @public
 * @returns a unique string token (e.g. "kf3n2a-0", "kf3n2a-1", ...)
 */
export function token(): string {
    return `${seed}-${(sequence++).toString(36)}`;
}

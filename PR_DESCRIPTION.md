# chore: major dependency upgrade + 2.1.0 release

Modernizes the toolchain to a **Node 24 / TypeScript 6 / Babel 8** baseline, removes the `uuid` runtime dependency, and ships the two packages as **`@semaver/core@2.1.0`** and **`@semaver/reflector@2.1.0`**. No breaking changes to the public API — the release is a backward-compatible **minor** (adds `core.token()`), and the emitted bundles keep their existing ES5-level decorator semantics.

## Highlights

### Toolchain upgrades
| Dependency | Before | After |
|---|---|---|
| Node baseline (`engines.node`) | (unset) | `>=22.18.0` |
| TypeScript | `^5.5.4` | `6.0.3` (pinned) |
| Babel | `7.x` | `8.x` (`@babel/core ^8.0.1`) |
| ESLint | `^9.9.1` | `^10.0.0` |
| Jest / `@types/jest` | `29.x` | `30.x` |
| Lerna | `^8.0.1` | `^9.0.0` |
| TypeDoc | `^0.26.5` | `^0.28.20` |
| `@rollup/plugin-*` | mixed 6/11/15/26/0.4 | 7/12/16/29/1 |

- **Babel 7 → 8**: the only required config change was the decorators plugin option `{ legacy: true }` → `{ version: "legacy" }`. The `@rollup/plugin-babel@7` peer-warning on `@babel/core ^7` is cosmetic (the plugin uses only APIs present in Babel 8 and does not gate on the major); Berry installs through it.
- Removed now-unused devDeps: `babel-jest`, `source-map-loader`, `rollup-plugin-delete`, `@babel/plugin-transform-runtime`.

### `uuid` removed → internal `core.token()`
`refactor: replace uuid dependency with internal token()` drops the `uuid` runtime dependency in favor of a tiny internal, process-unique, human-readable id generator (`token(): string`). It is **not** cryptographic, **not** persisted, and its format is **not** a stable contract — it is used only for internal identity/versioning compared with strict equality.

### `emitDecoratorMetadata` dropped
The library reads its **own** `__metadata__`, not `reflect-metadata` / `design:type`. Empirically verified that only `experimentalDecorators` is required (class/method/property + constructor & method **parameter** decorators all work without `emitDecoratorMetadata`; the `__param` emit comes from `experimentalDecorators`). `tsconfig` and the reflector README were updated accordingly.

### Packaging / release (2.1.0, fixed mode)
- Version bumped to **2.1.0** across root, both packages, and `lerna.json`.
- Added `engines.node` to both published packages; internal peer/dev refs to `@semaver/core` bumped `^2.0.0` → `^2.1.0` (packages release together).
- `repository.url` canonicalized to `git+https://…` form (`npm pkg fix`) so publish is warning-free.
- Trimmed the published `files` set; the reflector diagram SVG was replaced with a lightweight **native-text SVG** (~8 KB, down from a ~928 KB draw.io export) that renders on both GitHub and npm.

### Docs
- Regenerated the full TypeDoc API site for the new toolchain.
- Corrected README/TSDoc inaccuracies found in a pre-publish audit: reflector `addDecorator`/`removeDecorator` return `this` (chainable), core function signatures use `Empty<T>` to match source, plus broken links, typos, and non-compiling snippets.

## Verification
- `build`: all bundle formats regenerate cleanly.
- `test`: **179/179** passing (35 suites) — the primary indicator for the legacy-decorator / reflection behavior.
- `lint`: clean under ESLint 10.
- `docs`: TypeDoc 0 errors; `tsc --noEmit` clean.
- Bundle emit inspected: decorator helpers (`_classCallCheck` / `_inherits` / `_createClass`) and enumerability unchanged; **0** `design:` metadata in bundles.
- Verified via a local Verdaccio publish + install, and both packages are published to the public npm registry as `2.1.0`.

## Notes
- This branch fixes the dependency vulnerabilities Dependabot reports on `main`.
- Commit history was re-authored to `eugen.reyzenkind@web.de` (the semaver owner identity).

## Stats
`196 files changed, +32,115 / −13,782` across 38 commits.

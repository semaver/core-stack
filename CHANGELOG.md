# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This is a fixed-mode monorepo: `@semaver/core` and `@semaver/reflector` are always
released together under the same version.

## [2.2.0] - 2026-09-18

### Changed
- **reflector — BREAKING:** `ClassTableNames` and `MetadataClassNames` are no longer
  string enums. They are now frozen const objects whose keys are cross-realm global
  symbols created with `Symbol.for("@semaver/reflector/...")` (e.g. `class_table`,
  `metadata`, `cached_metadata`, `own_hash`, `parent_hash`), replacing the previous
  string values (`"__class_table__"`, `"__metadata__"`, etc.). Consumers relying on the
  enum type or string values must migrate to the new symbol-backed keys and the new
  `MetadataClassNamesType` / `ClassTableNamesType` shapes ([#102]).
- **reflector:** metadata and the global `ClassTable` are now stored as non-enumerable,
  `Symbol.for`-keyed properties instead of enumerable string-keyed ones, so they no
  longer appear in `Object.keys`, `for..in`, object spread, or JSON serialization, and
  duplicate library copies sharing one `globalThis` resolve the same keys ([#102]).
- Lowered the declared Node engine for both packages from `>=22.18.0` to `>=20.0.0`;
  reflector's `@semaver/core` dev/peer range widened to `^2.2.0`.

### Added
- **reflector:** `ClassTable` storage-format versioning — a `CLASS_TABLE_PROTOCOL_VERSION`
  constant, a `_protocol_version` field on `IClassTableRef`, and a `console.warn` when a
  copy of the library finds a `ClassTable` stamped with an incompatible protocol version.
  New public types `ClassTableNamesType` / `ClassTableNamesValues` and
  `MetadataClassNamesType` / `MetadataClassNamesValues`; `ClassTableProvider`'s
  constructor now accepts an injectable `storage` object (default `globalThis`) ([#102]).

### Security
- Bumped many transitive dependency pins in root `resolutions` to patched versions:
  `brace-expansion` (1.x/2.x/5.x), `js-yaml` (3.x and 4.x), `tar` (>=7.5.21), `fast-uri`,
  `undici` (>=8.9.0), `axios` (>=1.18.0), `ip-address` (>=10.x), plus `pacote`,
  `smol-toml`, and `browserslist`
  ([#55], [#56], [#71], [#72], [#73], [#77], [#80], [#85], [#86]).

### Build / CI
- Added developer tooling and CI: `knip`, `size-limit` (per-package esm gzip budgets),
  `husky` + `lint-staged`, `commitlint`, SonarCloud analysis, a metrics workflow that
  publishes metrics as an artifact (instead of committing to `main`), and `SECURITY.md`.
  Includes routine dependabot bumps of dev-dependency groups and GitHub Actions
  ([#54], [#57], [#67], [#68], [#70], [#95], [#103], [#104]).

## [2.1.1] - 2026-07-17

### Fixed
- **types:** dual-package (ESM/CJS) type resolution — the `exports` map now uses nested
  `import`/`require` conditions pointing at separate declaration files (`.d.ts` for ESM,
  `.d.cts` for CJS), resolving `attw` FalseESM and node16 `InternalResolutionError`
  failures. A new rollup plugin emits the parallel `.d.cts` declaration tree and rewrites
  relative re-exports to carry explicit `.js`/`.cjs` extensions. No runtime source
  changed ([#49]).

### Security
- Introduced a root `resolutions` block pinning vulnerable transitive dependencies,
  including `js-yaml`, `@babel/core`, `@babel/helpers`, `minimatch`, `brace-expansion`,
  `tar`, `picomatch`, `ip-address`, `flatted`, and `handlebars` ([#36], [#40], [#41]).

### Changed
- Dropped `emitDecoratorMetadata` from `tsconfig` (the library never relies on
  `design:type` metadata) and canonicalized `repository.url` to `git+https` form for
  correct npm metadata.
- Regenerated API documentation and corrected README method-signature inaccuracies found
  in a pre-publish audit.

### Build / CI
- Added a GitHub Actions CI workflow, an OpenSSF Scorecard workflow, and Dependabot
  dependency grouping ([#42]).

## [2.1.0] - 2026-07-11

### Added
- **core:** new public `token()` function — generates a process-unique, human-readable
  string id (seed + monotonic counter, e.g. `"kf3n2a-0"`) for internal identity via
  strict equality. Explicitly not cryptographic, not persisted, and not a stable format
  contract.

### Removed
- **reflector — BREAKING (dependency surface):** removed the `uuid` / `@types/uuid`
  dependency. All internal hash generation now uses `@semaver/core`'s `token()` instead
  of uuid v4. `@semaver/core` is now a `peerDependency` (`^2.1.0`); consumers must have
  it installed.

### Changed
- `exports` maps for both packages now declare an explicit `"types"` condition and a
  `"default"` fallback (ESM build). Published tarballs no longer include the `docs/`
  folder; reflector ships only `diagrams/*.svg`.
- Build/compiler config: rollup `babelHelpers` switched `runtime` → `bundled` (helpers
  inlined); declarations output to `lib/` with `rootDir` = `src/`; babel decorators
  option `legacy:true` → `version:"legacy"`; tsconfig `moduleResolution` `Node` →
  `Bundler`, target `ES5` → `ES2015`.

### Build / CI
- Raised the Node baseline: `.nvmrc` `v18.18.0` → `v24.18.0`, and all `package.json`
  declare `engines.node` `>=22.18.0`. Major toolchain upgrades: Babel 7 → 8, ESLint
  9 → 10, Jest 29 → 30, Lerna 8 → 9, TypeScript 5.5 → 6.0.3, TypeDoc 0.26 → 0.28, and the
  `@rollup/*` plugins; yarn pinned to 4.17.1 via corepack.

> Note: the release commit is titled "pin engines.node" and `.nvmrc` targets v24, but the
> pinned `engines.node` floor is `>=22.18.0` (the runtime floor and the recommended dev
> version differ intentionally).

## [2.0.0] - 2024-09-09

### Changed
- **core — BREAKING:** renamed/split the nullable utility types. `Nullable<T>` now means
  `T | null` (previously `T | null | undefined`). New `Empty<T> = Nullable<T> |
  Undefined<T>` carries the old "null or undefined" semantics, and `Undefined<T> = T |
  undefined` was added. Callers relying on `Nullable<T>` accepting `undefined` must
  migrate to `Empty<T>`.
- **core — BREAKING:** replaced static utility classes with standalone functions.
  `CoreError` removed in favor of `ExtendedError` plus `throwDefault()`/`throwError()`;
  `CoreObject` and `CoreReflect` static classes replaced by standalone functions
  (`isObjectEmpty`, `isObjectPrimitive`, `classOfObject`, `superClassOfObject`,
  `hasOwnProperty`, `hasProperty`, `getPropertyOwner`, `getPropertyDescriptor`).
- **reflector — BREAKING:** replaced the `DecoratedElementType` numeric enum with a new
  `DecoratedElementEnum` module (a `DecoratedElementType` interface, a frozen
  implementation object, and `DecoratedElementTypeValues`). Export path changed from
  `metatable/types/DecoratedElementType` to `DecoratedElementEnum`.
- **BREAKING (packaging):** restructured the `exports` map for both packages and renamed
  the ESM build output `library.esm.js` → `library.esm.mjs`; added `main`/`module`
  fields, `sideEffects:false`, and `typesVersions`.
- **reflector:** bumped `uuid` / `@types/uuid` `^8` → `^10`; raised `@semaver/core`
  peer/dev dependency to `^2.0.0`.

### Removed
- **core — BREAKING:** removed the dictionary type exports `IDictionary`,
  `INumberKeyDictionary`, and `IStringKeyDictionary`.

### Build / CI
- Migrated to ESLint 9 flat config (`eslint.config.mjs`), upgraded typescript-eslint
  6 → 8 and TypeScript 5.3 → 5.5, bumped rollup plugins; `.nvmrc` `v18.12.0` → `v18.18.0`.

## [1.0.6] - 2023-12-21

### Fixed
- **packaging:** fixed publishing of the CommonJS build. Both packages now declare a
  conditional `exports` map (`import` → `./lib/library.esm.js`, `require` →
  `./lib/library.cjs.cjs`) instead of the previous `main`/`module` fields ([#9]).

### Changed
- Reworked the Rollup outputs: ESM renamed to `library.esm.js`/`.esm.min.js`, and the
  former SystemJS/UMD outputs replaced by CommonJS `library.cjs.cjs`/`.cjs.min.cjs`;
  build now cleans `lib/` via `rollup-plugin-cleandir`. `tsconfig` compiles with module
  `ES6`; added per-package `.babelrc.json`.

### Build / CI
- Updated build/dev dependencies, notably Lerna 7.3.0 → 8.0.1, Rollup 4.0.2 → 4.9.1,
  TypeScript 5.2.2 → 5.3.3, and the `@babel/*` toolchain.

## [1.0.5] - 2023-11-24

### Changed
- Version bump only (fixed-mode). No source, dependency, CI, or documentation changes.

## [1.0.4] - 2023-11-24

### Changed
- **BREAKING (packaging):** reworked the published entry points. `main` moved to the UMD
  build (`lib/library.umd.js`) instead of CommonJS, `module` moved to `lib/library.es.js`,
  and the separate `umd` package.json field was removed. Consumers pinning the previous
  file names or the `umd` field must update ([#6]).
- Overhauled the Rollup build to emit ES, UMD, and SystemJS bundles, each with a minified
  variant; dropped the standalone CommonJS output. Adjusted `tsconfig` compiler options
  (`module` `esnext` → `commonjs`, lib target → `esnext`) ([#6]).

## [1.0.3] - 2023-11-10

### Added
- **docs:** a "Requirements" section in the reflector README documenting the `tsconfig`
  `compilerOptions` (`experimentalDecorators`, `emitDecoratorMetadata`) needed for
  `@decorator()` syntax ([#4]).

### Changed
- Expanded npm package keywords for both packages for discoverability; regenerated the
  TypeDoc API documentation. No source/API changes.

## [1.0.2] - 2023-10-26

### Fixed
- **reflector:** fixed the broken class-members diagram link in the README to use an
  absolute `raw.githubusercontent.com` URL so it renders on the npm package page ([#2]).

### Added
- Added `homepage`, `bugs`, and structured `repository` fields to both package manifests
  ([#2]).

## [1.0.0] - 2023-10-25

### Added
- Initial public release of **`@semaver/core`** — a TypeScript library of
  class/constructor reflection and type utilities, published as ESM, CJS, and UMD bundles
  with bundled type definitions.
- Initial public release of **`@semaver/reflector`** — a decorator-based runtime
  reflection library (metatable, class table, member/parameter querying, runtime
  decoration, policy providers), depending on `@semaver/core` and `uuid` ([#1]).

<!-- Compare links -->
[2.2.0]: https://github.com/semaver/core-stack/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/semaver/core-stack/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/semaver/core-stack/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/semaver/core-stack/compare/v1.0.6...v2.0.0
[1.0.6]: https://github.com/semaver/core-stack/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/semaver/core-stack/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/semaver/core-stack/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/semaver/core-stack/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/semaver/core-stack/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/semaver/core-stack/releases/tag/v1.0.0

<!-- PR links -->
[#1]: https://github.com/semaver/core-stack/pull/1
[#2]: https://github.com/semaver/core-stack/pull/2
[#4]: https://github.com/semaver/core-stack/pull/4
[#6]: https://github.com/semaver/core-stack/pull/6
[#9]: https://github.com/semaver/core-stack/pull/9
[#36]: https://github.com/semaver/core-stack/pull/36
[#40]: https://github.com/semaver/core-stack/pull/40
[#41]: https://github.com/semaver/core-stack/pull/41
[#42]: https://github.com/semaver/core-stack/pull/42
[#49]: https://github.com/semaver/core-stack/pull/49
[#54]: https://github.com/semaver/core-stack/pull/54
[#55]: https://github.com/semaver/core-stack/pull/55
[#56]: https://github.com/semaver/core-stack/pull/56
[#57]: https://github.com/semaver/core-stack/pull/57
[#67]: https://github.com/semaver/core-stack/pull/67
[#68]: https://github.com/semaver/core-stack/pull/68
[#70]: https://github.com/semaver/core-stack/pull/70
[#71]: https://github.com/semaver/core-stack/pull/71
[#72]: https://github.com/semaver/core-stack/pull/72
[#73]: https://github.com/semaver/core-stack/pull/73
[#77]: https://github.com/semaver/core-stack/pull/77
[#80]: https://github.com/semaver/core-stack/pull/80
[#85]: https://github.com/semaver/core-stack/pull/85
[#86]: https://github.com/semaver/core-stack/pull/86
[#95]: https://github.com/semaver/core-stack/pull/95
[#102]: https://github.com/semaver/core-stack/pull/102
[#103]: https://github.com/semaver/core-stack/pull/103
[#104]: https://github.com/semaver/core-stack/pull/104

# Changelog — @semaver/reflector

All notable changes to `@semaver/reflector` are documented in this file. For the full
monorepo history (including `@semaver/core`), see the
[root CHANGELOG](https://github.com/semaver/core-stack/blob/main/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`@semaver/core` and `@semaver/reflector` are released together under the same version.

## [2.2.0] - 2026-09-18

### Changed
- **BREAKING:** `ClassTableNames` and `MetadataClassNames` are no longer string enums.
  They are now frozen const objects whose keys are cross-realm global symbols created with
  `Symbol.for("@semaver/reflector/...")` (e.g. `class_table`, `metadata`,
  `cached_metadata`, `own_hash`, `parent_hash`), replacing the previous string values
  (`"__class_table__"`, `"__metadata__"`, etc.). Consumers relying on the enum type or
  string values must migrate to the new symbol-backed keys and the new
  `MetadataClassNamesType` / `ClassTableNamesType` shapes ([#102]).
- metadata and the global `ClassTable` are now stored as non-enumerable, `Symbol.for`-keyed
  properties instead of enumerable string-keyed ones, so they no longer appear in
  `Object.keys`, `for..in`, object spread, or JSON serialization, and duplicate library
  copies sharing one `globalThis` resolve the same keys ([#102]).
- Lowered the declared Node engine from `>=22.18.0` to `>=20.0.0`; the `@semaver/core`
  dev/peer range widened to `^2.2.0`.

### Added
- `ClassTable` storage-format versioning — a `CLASS_TABLE_PROTOCOL_VERSION` constant, a
  `_protocol_version` field on `IClassTableRef`, and a `console.warn` when a copy of the
  library finds a `ClassTable` stamped with an incompatible protocol version. New public
  types `ClassTableNamesType` / `ClassTableNamesValues` and `MetadataClassNamesType` /
  `MetadataClassNamesValues`; `ClassTableProvider`'s constructor now accepts an injectable
  `storage` object (default `globalThis`) ([#102]).

### Security
- Bumped many transitive dependency pins in root `resolutions` to patched versions:
  `brace-expansion` (1.x/2.x/5.x), `js-yaml` (3.x and 4.x), `tar` (>=7.5.21), `fast-uri`,
  `undici` (>=8.9.0), `axios` (>=1.18.0), `ip-address` (>=10.x), plus `pacote`,
  `smol-toml`, and `browserslist`
  ([#55], [#56], [#71], [#72], [#73], [#77], [#80], [#85], [#86]).

### Build / CI
- Added developer tooling and CI: `knip`, `size-limit` (per-package esm gzip budgets),
  `husky` + `lint-staged`, `commitlint`, SonarCloud analysis, a metrics workflow, and
  `SECURITY.md` ([#54], [#57], [#67], [#68], [#70], [#95], [#103], [#104]).

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
- Dropped `emitDecoratorMetadata` from `tsconfig`; canonicalized `repository.url` to
  `git+https` form for correct npm metadata.
- Regenerated API documentation and corrected README method-signature inaccuracies found
  in a pre-publish audit.

### Build / CI
- Added a GitHub Actions CI workflow, an OpenSSF Scorecard workflow, and Dependabot
  dependency grouping ([#42]).

## [2.1.0] - 2026-07-11

### Removed
- **BREAKING (dependency surface):** removed the `uuid` / `@types/uuid` dependency. All
  internal hash generation now uses `@semaver/core`'s `token()` instead of uuid v4.
  `@semaver/core` is now a `peerDependency` (`^2.1.0`); consumers must have it installed.

### Changed
- The `exports` map now declares an explicit `"types"` condition and a `"default"`
  fallback (ESM build). Published tarball no longer includes the `docs/` folder; it ships
  only `diagrams/*.svg`.
- Build/compiler config: rollup `babelHelpers` `runtime` → `bundled`; declarations output
  to `lib/` with `rootDir` = `src/`; babel decorators `legacy:true` → `version:"legacy"`;
  tsconfig `moduleResolution` `Node` → `Bundler`, target `ES5` → `ES2015`.

### Build / CI
- Raised the Node baseline: `.nvmrc` `v18.18.0` → `v24.18.0`, `engines.node` `>=22.18.0`.
  Major toolchain upgrades: Babel 7 → 8, ESLint 9 → 10, Jest 29 → 30, Lerna 8 → 9,
  TypeScript 5.5 → 6.0.3, TypeDoc 0.26 → 0.28; yarn pinned to 4.17.1 via corepack.

## [2.0.0] - 2024-09-09

### Changed
- **BREAKING:** replaced the `DecoratedElementType` numeric enum with a new
  `DecoratedElementEnum` module (a `DecoratedElementType` interface, a frozen
  implementation object, and `DecoratedElementTypeValues`). Export path changed from
  `metatable/types/DecoratedElementType` to `DecoratedElementEnum`.
- **BREAKING (packaging):** restructured the `exports` map and renamed the ESM build
  output `library.esm.js` → `library.esm.mjs`; added `main`/`module` fields,
  `sideEffects:false`, and `typesVersions`.
- Bumped `uuid` / `@types/uuid` `^8` → `^10`; raised `@semaver/core` peer/dev dependency
  to `^2.0.0`. Adopted the renamed `@semaver/core` type utilities (`Empty<T>` etc.) and
  the standalone helper functions that replaced the removed static classes.

### Build / CI
- Migrated to ESLint 9 flat config, upgraded typescript-eslint 6 → 8 and TypeScript
  5.3 → 5.5.

## [1.0.6] - 2023-12-21

### Fixed
- **packaging:** fixed publishing of the CommonJS build via a conditional `exports` map
  (`import` → `./lib/library.esm.js`, `require` → `./lib/library.cjs.cjs`) ([#9]).
- Corrected a JSDoc typo in `Reflector.getDecoratedConstructor` ([#9]).

### Build / CI
- Updated build/dev dependencies, notably Lerna 7.3.0 → 8.0.1, Rollup 4.0.2 → 4.9.1,
  TypeScript 5.2.2 → 5.3.3.

## [1.0.5] - 2023-11-24

### Changed
- Version bump only (fixed-mode). No source, dependency, CI, or documentation changes.

## [1.0.4] - 2023-11-24

### Changed
- **BREAKING (packaging):** reworked the published entry points — `main` moved to the UMD
  build (`lib/library.umd.js`), `module` moved to `lib/library.es.js`, and the separate
  `umd` field was removed. Rollup now emits ES/UMD/SystemJS bundles (each with a minified
  variant) and no longer produces a standalone CommonJS output ([#6]).

## [1.0.3] - 2023-11-10

### Added
- **docs:** a "Requirements" section in the README documenting the `tsconfig`
  `compilerOptions` (`experimentalDecorators`, `emitDecoratorMetadata`) needed for
  `@decorator()` syntax ([#4]).

### Changed
- Expanded npm package keywords for discoverability; regenerated the TypeDoc API
  documentation. No source/API changes.

## [1.0.2] - 2023-10-26

### Fixed
- Fixed the broken class-members diagram link in the README to use an absolute
  `raw.githubusercontent.com` URL so it renders on the npm package page ([#2]).

### Added
- Added `homepage`, `bugs`, and structured `repository` fields to the package manifest
  ([#2]).

## [1.0.0] - 2023-10-25

### Added
- Initial public release — a decorator-based runtime reflection library (metatable, class
  table, member/parameter querying, runtime decoration, policy providers), depending on
  `@semaver/core` and `uuid` ([#1]).

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

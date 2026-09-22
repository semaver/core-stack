# Changelog — @semaver/core

All notable changes to `@semaver/core` are documented in this file. For the full
monorepo history (including `@semaver/reflector`), see the
[root CHANGELOG](https://github.com/semaver/core-stack/blob/main/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`@semaver/core` and `@semaver/reflector` are released together under the same version.

## [3.0.0] - 2026-09-18

Released in lockstep with `@semaver/reflector` 3.0.0 (fixed-mode monorepo).
**`@semaver/core` has no functional or API changes in this release** — the major
bump comes from `@semaver/reflector`, which mis-released a breaking change as 2.2.0.
`@semaver/reflector@2.2.0` was unpublished from npm; `@semaver/core@2.2.0` could not
be unpublished (npm policy) and is deprecated. Both packages move to 3.0.0 together.
See the
[root CHANGELOG](https://github.com/semaver/core-stack/blob/main/CHANGELOG.md) for the
reflector breaking changes and migration guide.

### Added
- The package now ships `CHANGELOG.md` inside the published npm tarball (added to
  `files[]`) ([#108]).

### Build / CI
- Corrected the stale test-count label in CI (`179/179 across 35 suites` →
  `187/187 across 37 suites`) ([#108]).
- Added a `smoke` CI job that packs both packages on Node 24 and then performs a real
  `import()` (ESM) and `require()` (CJS) of the packed tarballs on Node 20, 22, and
  24, verifying the declared `engines.node >=20` across both module systems ([#108]).

## [2.2.0] - 2026-09-18 [DEPRECATED]

> **Deprecated on npm.** Released together with the mis-versioned `@semaver/reflector`
> 2.2.0 and superseded by **[3.0.0]**. Unlike `@semaver/reflector@2.2.0` (which was
> unpublished), `@semaver/core@2.2.0` could not be unpublished (npm policy: it had
> dependent packages) and is instead deprecated on npm pointing to 3.0.0.
> `@semaver/core` 2.2.0 and 3.0.0 are functionally identical; the version move exists
> only to keep the two packages in lockstep. Use `@semaver/core@^3.0.0`.


### Changed
- Lowered the declared Node engine from `>=22.18.0` to `>=20.0.0`.

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
  failures. No runtime source changed ([#49]).

### Security
- Introduced a root `resolutions` block pinning vulnerable transitive dependencies,
  including `js-yaml`, `@babel/core`, `@babel/helpers`, `minimatch`, `brace-expansion`,
  `tar`, `picomatch`, `ip-address`, `flatted`, and `handlebars` ([#36], [#40], [#41]).

### Changed
- Dropped `emitDecoratorMetadata` from `tsconfig`; canonicalized `repository.url` to
  `git+https` form for correct npm metadata.

### Build / CI
- Added a GitHub Actions CI workflow, an OpenSSF Scorecard workflow, and Dependabot
  dependency grouping ([#42]).

## [2.1.0] - 2026-07-11

### Added
- New public `token()` function — generates a process-unique, human-readable string id
  (seed + monotonic counter, e.g. `"kf3n2a-0"`) for internal identity via strict
  equality. Explicitly not cryptographic, not persisted, and not a stable format contract.

### Changed
- The `exports` map now declares an explicit `"types"` condition and a `"default"`
  fallback (ESM build). Published tarball no longer includes the `docs/` folder.
- Build/compiler config: rollup `babelHelpers` `runtime` → `bundled`; declarations output
  to `lib/` with `rootDir` = `src/`; babel decorators `legacy:true` → `version:"legacy"`;
  tsconfig `moduleResolution` `Node` → `Bundler`, target `ES5` → `ES2015`.

### Build / CI
- Raised the Node baseline: `.nvmrc` `v18.18.0` → `v24.18.0`, `engines.node` `>=22.18.0`.
  Major toolchain upgrades: Babel 7 → 8, ESLint 9 → 10, Jest 29 → 30, Lerna 8 → 9,
  TypeScript 5.5 → 6.0.3, TypeDoc 0.26 → 0.28; yarn pinned to 4.17.1 via corepack.

## [2.0.0] - 2024-09-09

### Changed
- **BREAKING:** renamed/split the nullable utility types. `Nullable<T>` now means
  `T | null` (previously `T | null | undefined`). New `Empty<T> = Nullable<T> |
  Undefined<T>` carries the old "null or undefined" semantics, and `Undefined<T> = T |
  undefined` was added. Callers relying on `Nullable<T>` accepting `undefined` must
  migrate to `Empty<T>`.
- **BREAKING:** replaced static utility classes with standalone functions. `CoreError`
  removed in favor of `ExtendedError` plus `throwDefault()`/`throwError()`; `CoreObject`
  and `CoreReflect` static classes replaced by standalone functions (`isObjectEmpty`,
  `isObjectPrimitive`, `classOfObject`, `superClassOfObject`, `hasOwnProperty`,
  `hasProperty`, `getPropertyOwner`, `getPropertyDescriptor`).
- **BREAKING (packaging):** restructured the `exports` map and renamed the ESM build
  output `library.esm.js` → `library.esm.mjs`; added `main`/`module` fields,
  `sideEffects:false`, and `typesVersions`.

### Removed
- **BREAKING:** removed the dictionary type exports `IDictionary`, `INumberKeyDictionary`,
  and `IStringKeyDictionary`.

### Build / CI
- Migrated to ESLint 9 flat config, upgraded typescript-eslint 6 → 8 and TypeScript
  5.3 → 5.5.

## [1.0.6] - 2023-12-21

### Fixed
- **packaging:** fixed publishing of the CommonJS build via a conditional `exports` map
  (`import` → `./lib/library.esm.js`, `require` → `./lib/library.cjs.cjs`) ([#9]).

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

### Changed
- Expanded npm package keywords for discoverability; regenerated the TypeDoc API
  documentation. No source/API changes.

## [1.0.2] - 2023-10-26

### Added
- Added `homepage`, `bugs`, and structured `repository` fields to the package manifest
  ([#2]).

## [1.0.0] - 2023-10-25

### Added
- Initial public release — a TypeScript library of class/constructor reflection and type
  utilities, published as ESM, CJS, and UMD bundles with bundled type definitions.

<!-- Compare links -->
[3.0.0]: https://github.com/semaver/core-stack/compare/v2.2.0...v3.0.0
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
[#2]: https://github.com/semaver/core-stack/pull/2
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
[#103]: https://github.com/semaver/core-stack/pull/103
[#104]: https://github.com/semaver/core-stack/pull/104
[#108]: https://github.com/semaver/core-stack/pull/108

# Security Policy

## Supported Versions

Security updates are provided for the latest published minor release line of both
`@semaver/core` and `@semaver/reflector`.

| Version | Supported |
| ------- | --------- |
| 2.1.x   | ✅        |
| < 2.1   | ❌        |

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report privately using GitHub's **[Private vulnerability reporting](https://github.com/semaver/core-stack/security/advisories/new)**
(Security → Advisories → *Report a vulnerability*), or email **eugen.reyzenkind@web.de**.

Please include:

- affected package(s) and version(s),
- a description of the issue and its impact,
- steps to reproduce (a minimal example if possible).

You can expect an initial acknowledgement within a few days. Once the report is validated,
a fix will be prepared and released, and the advisory published. We appreciate responsible
disclosure and will credit reporters unless they prefer to remain anonymous.

## Scope

`@semaver/core` and `@semaver/reflector` are build/runtime libraries with no network,
filesystem, or process access of their own. Reports should concern the library code itself
(the published `lib/` bundles and type declarations) rather than transitive development
dependencies, which are tracked separately via Dependabot.

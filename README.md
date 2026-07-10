# Semaver Libraries (Core Stack)

### Packages

- [Core](packages/core/README.md)
- [Reflector](packages/reflector/README.md)

### Requirements

- [Node 22+](https://nodejs.org/en/download/package-manager) (_>= 22.18.0_)

### Tool Set

- [yarn](https://yarnpkg.com/) - package manager
- [lerna](https://lerna.js.org/) - monorepo manager
- [typescript](https://www.typescriptlang.org/) - source code programming language
- [babel](https://babeljs.io/) - transpilation tool
- [rollup js](https://rollupjs.org/) - build tool
- [jest](https://jestjs.io/) - test framework/tool
- [eslint](https://eslint.org/) - lint tool
- [typedoc](https://typedoc.org/) - documentation tool

### Development

- Clone the repo (git)
- Install dependencies `yarn install`
- Build index files for packages `yarn run index`
- Build all packages `yarn run build`
- Test all packages `yarn run test` or `yarn run test:all`
- Lint all packages `yarn run lint`
- Generate docs `yarn run docs`

### Notes

- We use **peer** dependencies.

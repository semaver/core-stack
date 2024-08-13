# Semaver Libraries (Core Stack)

### Packages

- [Core](packages/core/README.md)
- [Reflector](packages/reflector/README.md)

### Requirements

- [Node 18+](https://nodejs.org/en/download/package-manager)

### Tool Set

- [yarn](https://yarnpkg.com/) - package manager
- [lerna](https://lerna.js.org/) - mono repo manager
- [typescript](https://www.typescriptlang.org/) - source code programing language
- [babel](https://babeljs.io/) - transpilation tool
- [rollup js](https://rollupjs.org/) - build tool
- [jest](https://jestjs.io/)  - test framework/tool
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

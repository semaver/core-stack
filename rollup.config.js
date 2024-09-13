import path from "path";
import * as fs from "fs";
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import {cleandir} from "rollup-plugin-cleandir";
import terser from "@rollup/plugin-terser";

const PACKAGE_NAME = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_NAME, 'package.json'), 'utf-8'));

const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
}
const extensions = ['.js', '.ts', '.tsx'];
const babelOptions = {
    exclude: /node_modules/,
    extensions,
    configFile: '../../babel.config.json',
    babelHelpers: 'runtime'
};
const nodeOptions = {
    extensions,
};
const typescriptOptions = {
    tsconfig: `${PACKAGE_NAME}/tsconfig.json`,
    exclude: [`${PACKAGE_NAME}/tests/**`],
    declaration: true,
    declarationDir: '.',
    emitDeclarationOnly: true,
    declarationMap: true,
};
export default {
    input: `${PACKAGE_NAME}/src/index.ts`,
    external: [...Object.keys(pkg.peerDependencies ?? {})],
    output: [
        // ESM with .mjs extension
        {
            file: 'lib/library.esm.mjs',
            format: 'es',
            sourcemap: true,
        },
        {
            file: 'lib/library.esm.min.mjs',
            format: 'es',
            plugins: [terser()],
            sourcemap: true,
        },
        // CommonJS with .cjs extension
        {
            file: 'lib/library.cjs.cjs',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'lib/library.cjs.min.cjs',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: true,
        },
        // UMD with standard .js extension
        {
            file: 'lib/library.umd.js',
            format: 'umd',
            name: `${pkg.rawName}`,
            sourcemap: true,
        },
        {
            file: 'lib/library.umd.min.js',
            format: 'umd',
            name: `${pkg.rawName}`,
            plugins: [terser()],
            sourcemap: true,
        },
        // IIFE with standard .js extension
        {
            file: 'lib/library.iife.js',
            format: 'iife',
            name: `${pkg.rawName}`,
            sourcemap: true,
        },
        {
            file: 'lib/library.iife.min.js',
            format: 'iife',
            name: `${pkg.rawName}`,
            plugins: [terser()],
            sourcemap: true,
        },
    ],
    plugins: [
        cleandir(`${PACKAGE_NAME}/lib`),
        nodeResolve(nodeOptions),
        typescript(typescriptOptions),
        excludeDependenciesFromBundle({peerDependencies: true}),
        babel(babelOptions),
        commonjs(commonjsOptions)
    ]
}

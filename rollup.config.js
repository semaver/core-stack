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
    declarationDir: `${PACKAGE_NAME}/lib/`,
    emitDeclarationOnly: true,
    declarationMap: true,
};
const external = [
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.dependencies ?? {}),
];
const globals = external.reduce((acc, moduleName) => {
     // Use the last part of the module name as the global name
    acc[moduleName] = moduleName.split('/').pop();
    return acc;
}, {});

export default {
    input: `${PACKAGE_NAME}/src/index.ts`,
    external: external,
    output: [
        // ESM with .mjs extension
        {
            file: `${PACKAGE_NAME}/lib/library.esm.mjs`,
            format: 'es',
            sourcemap: true,
        },
        {
            file: `${PACKAGE_NAME}/lib/library.esm.min.mjs`,
            format: 'es',
            plugins: [terser()],
            sourcemap: true,
        },
        // CommonJS with .cjs extension
        {
            file: `${PACKAGE_NAME}/lib/library.cjs.cjs`,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: `${PACKAGE_NAME}/lib/library.cjs.min.cjs`,
            format: 'cjs',
            plugins: [terser()],
            sourcemap: true,
        },
        // UMD with standard .js extension
        {
            file: `${PACKAGE_NAME}/lib/library.umd.js`,
            format: 'umd',
            name: pkg.rawName, // Corrected placement of the name option
            sourcemap: true,
            globals: globals,
        },
        {
            file: `${PACKAGE_NAME}/lib/library.umd.min.js`,
            format: 'umd',
            name: pkg.rawName, // Corrected placement of the name option
            plugins: [terser()],
            sourcemap: true,
            globals: globals,
        },
        // IIFE with standard .js extension
        {
            file: `${PACKAGE_NAME}/lib/library.iife.js`,
            format: 'iife',
            name: pkg.rawName, // Corrected placement of the name option
            sourcemap: true,
            globals: globals,
        },
        {
            file: `${PACKAGE_NAME}/lib/library.iife.min.js`,
            format: 'iife',
            name: pkg.rawName, // Corrected placement of the name option
            plugins: [terser()],
            sourcemap: true,
            globals: globals,
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

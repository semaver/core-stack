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

// Fix TypeScript declaration files for Node16/NodeNext resolution and dual ESM/CJS packages.
// tsconfig uses "moduleResolution": "Bundler", so emitted .d.ts re-exports carry NO file
// extensions — which fails under node16 (both ESM and CJS) with an InternalResolutionError,
// and a single .d.ts served for the CJS `require` path is flagged FalseESM ("masquerading as
// ESM"). This plugin runs after declarations are emitted and:
//   1. rewrites relative re-exports/imports in every .d.ts to carry a ".js" extension (ESM);
//   2. writes a parallel tree of .d.cts files whose relative specifiers carry ".cjs".
// package.json then points the `import` condition at .d.ts and `require` at .d.cts.
// Verified green in all four attw modes (node10, node16-cjs, node16-esm, bundler).
function fixDeclarationsForDualPackage(libDir) {
    const addExt = (code, ext) =>
        code.replace(
            /(from\s+"|import\("|export\s+\*\s+from\s+")(\.\.?\/[^"]*?)"/g,
            (m, head, spec) => (/\.(js|cjs|mjs|json)$/.test(spec) ? m : `${head}${spec}.${ext}"`)
        );
    const walk = (dir, out = []) => {
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) walk(full, out);
            else if (entry.name.endsWith(".d.ts")) out.push(full);
        }
        return out;
    };
    return {
        name: "fix-declarations-for-dual-package",
        writeBundle() {
            const abs = path.join(PACKAGE_NAME, libDir);
            if (!fs.existsSync(abs)) return;
            for (const dtsPath of walk(abs)) {
                // 1. ESM declaration: relative specifiers -> ".js"
                const esm = addExt(fs.readFileSync(dtsPath, "utf-8"), "js");
                fs.writeFileSync(dtsPath, esm);
                // 2. CJS declaration sibling: relative specifiers -> ".cjs"
                const ctsPath = dtsPath.replace(/\.d\.ts$/, ".d.cts");
                fs.writeFileSync(ctsPath, addExt(esm.replace(/\.js"/g, '.cjs"'), "cjs"));
            }
        },
    };
}

const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/,
}
const extensions = ['.js', '.ts', '.tsx'];
const babelOptions = {
    exclude: /node_modules/,
    extensions,
    configFile: '../../babel.config.json',
    babelHelpers: 'bundled'
};
const nodeOptions = {
    extensions,
};
const typescriptOptions = {
    tsconfig: `${PACKAGE_NAME}/tsconfig.json`,
    exclude: [`${PACKAGE_NAME}/tests/**`],
    rootDir: `${PACKAGE_NAME}/src`,
    declaration: true,
    declarationDir: 'lib',
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
        commonjs(commonjsOptions),
        fixDeclarationsForDualPackage('lib')
    ]
}

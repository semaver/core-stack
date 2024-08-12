// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        files: ["**/*.ts"],
        ignores: ["**/*.d.ts"],
        rules: {
            "semi": [2, "always"],
            "@typescript-eslint/prefer-literal-enum-member": "error",
            "@typescript-eslint/explicit-function-return-type": [
                "error"
            ],
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    "accessibility": "explicit"
                }
            ],
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-explicit-any": [
                "error",
                {
                    "ignoreRestArgs": true
                }
            ]
        },
    },
);

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.browser,
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        ignores: ['node_modules', 'dist'],
        rules: {
            ...tseslint.configs.recommended.rules,
            'no-console': 'warn',
            'no-unused-vars': 'warn',
            'prefer-const': 'error',
            // 'no-undef': 'error',
            eqeqeq: 'error',
        },
    },
];
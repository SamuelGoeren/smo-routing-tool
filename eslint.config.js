import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
            prettier,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            'for-direction': 'off',
            // Enforce consistent brace style for blocks
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],

            // Enforce consistent spacing inside curly braces
            'block-spacing': ['error', 'always'],

            // Enforce consistent line breaks inside curly braces
            'object-curly-newline': [
                'error',
                { multiline: true, consistent: true },
            ],

            // Enforce consistent spacing around keywords (e.g., `for`)
            'keyword-spacing': ['error', { before: true, after: true }],

            // Prevent unnecessary line breaks in control structures
            'nonblock-statement-body-position': ['error', 'beside'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];

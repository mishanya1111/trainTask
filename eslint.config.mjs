import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.jest },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    pluginJs.configs.recommended,
    {
        plugins: {
            react: pluginReact,
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
        },
        settings: {
            react: {
                version: 'detect', // Автоматическое определение версии React
            },
        },
    },
    eslintConfigPrettier,  // для отключения конфликтующих правил с Prettier
    ...tseslint.configs.recommended,

    // Настройки для сортировки импортов
    {
        plugins: {
            'simple-import-sort': simpleImportSort, // Исправили с массива на объект
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },

    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
];

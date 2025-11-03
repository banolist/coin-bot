// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'], // Specify the path to your project's tsconfig.json
      },
    },
    rules: {
      // Add any custom rules here
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'semi': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
    ignores: [
      'dist/',
      'node_modules/',
    ],
  }
);
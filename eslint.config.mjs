import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configs as tseslint } from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

/** @type {import("eslint").Linter.Config[]}
 */
const config = [
  ...compat.extends('next/core-web-vitals'),
  eslint.configs.recommended,
  //
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.name,
      },
    },
  },
  ...tseslint.strictTypeChecked,
  ...tseslint.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...tseslint.disableTypeChecked,
  },
  //
  perfectionist.configs['recommended-natural'],
  //
  prettier,
  //
  unicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  //
  n.configs['flat/recommended-script'],
  {
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
  //
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
]

export default config

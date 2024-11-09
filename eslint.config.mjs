import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-config-prettier'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import importX from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import("eslint").Linter.Config[]}
 */
const config = [
  ...compat.extends('next/core-web-vitals'),
  eslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': [
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
  ...tseslint.configs.strictTypeChecked.map((config, index, self) => {
    if (index === self.length - 1) {
      return {
        files: ['**/*.ts'],
        ...config,
      }
    }
    return config
  }),
  ...tseslint.configs.stylisticTypeChecked.map((config, index, self) => {
    if (index === self.length - 1) {
      return {
        files: ['**/*.ts'],
        ...config,
      }
    }
    return config
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.name,
      },
    },
  },
  {
    files: ['**/*.{js,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  perfectionist.configs['recommended-natural'],
  prettier,
  unicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  n.configs['flat/recommended-script'],
  {
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
]

export default config

// export default [
//   ...compat.extends(
//     'next/core-web-vitals',
//     'plugin:@typescript-eslint/strict-type-checked',
//     'prettier',
//     'plugin:unicorn/recommended',
//   ),
//   {
//     plugins: {
//       perfectionist,
//       'import-x': importX,
//       n,
//     },
//
//     languageOptions: {
//       ecmaVersion: 5,
//       sourceType: 'script',
//
//       parserOptions: {
//         project: true,
//         tsconfigRootDir: '/Users/x/Documents/dev/Stress-is-Stressful',
//       },
//     },
//
//     rules: {
//       'perfectionist/sort-exports': [
//         'error',
//         {
//           order: 'asc',
//           type: 'natural',
//         },
//       ],
//
//       'perfectionist/sort-imports': [
//         'error',
//         {
//           groups: [
//             'type',
//             ['parent-type', 'sibling-type', 'index-type'],
//             'builtin',
//             'external',
//             ['internal', 'internal-type'],
//             ['parent', 'sibling', 'index'],
//             'side-effect',
//             'object',
//             'unknown',
//           ],
//
//           newlinesBetween: 'ignore',
//           order: 'asc',
//           type: 'natural',
//         },
//       ],
//
//       'perfectionist/sort-named-exports': [
//         'error',
//         {
//           order: 'asc',
//           type: 'natural',
//         },
//       ],
//
//       'perfectionist/sort-named-imports': [
//         'error',
//         {
//           order: 'asc',
//           type: 'natural',
//         },
//       ],
//
//       'import/first': 'error',
//       'import/no-duplicates': 'error',
//       'import/no-mutable-exports': 'error',
//       'import/no-named-default': 'error',
//       'import/no-self-import': 'error',
//       'import/no-webpack-loader-syntax': 'error',
//
//       'import/newline-after-import': [
//         'error',
//         {
//           count: 1,
//         },
//       ],
//
//       'n/handle-callback-err': ['error', '^(err|error)$'],
//       'n/no-deprecated-api': 'error',
//       'n/no-exports-assign': 'error',
//       'n/no-new-require': 'error',
//       'n/no-path-concat': 'error',
//       'n/prefer-global/buffer': ['error', 'never'],
//       'n/prefer-global/process': ['error', 'never'],
//       'n/process-exit-as-throw': 'error',
//
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {
//           ignoreRestSiblings: true,
//         },
//       ],
//
//       '@typescript-eslint/no-var-requires': 'off',
//
//       '@typescript-eslint/no-empty-object-type': [
//         'error',
//         {
//           allowInterfaces: 'with-single-extends',
//         },
//       ],
//
//       'unicorn/filename-case': 'off',
//       'unicorn/no-array-reduce': 'off',
//       'unicorn/no-nested-ternary': 'off',
//       'unicorn/no-null': 'off',
//       'unicorn/prefer-node-protocol': 'off',
//       'unicorn/prevent-abbreviations': 'off',
//     },
//   },
//   ...compat
//     .extends('plugin:@typescript-eslint/disable-type-checked')
//     .map((config) => ({
//       ...config,
//       files: ['**/*.cjs', '**/*.mjs'],
//     })),
// ]

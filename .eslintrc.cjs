/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['perfectionist', 'import-x', 'n'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/strict-type-checked',
    'prettier',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
    'perfectionist/sort-imports': [
      'error',
      {
        groups: [
          'type',
          ['parent-type', 'sibling-type', 'index-type'],
          'builtin',
          'external',
          ['internal', 'internal-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'object',
          'unknown',
        ],
        newlinesBetween: 'ignore',
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      { order: 'asc', type: 'natural' },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      { order: 'asc', type: 'natural' },
    ],

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/newline-after-import': ['error', { count: 1 }],

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/prefer-global/buffer': ['error', 'never'],
    'n/prefer-global/process': ['error', 'never'],
    'n/process-exit-as-throw': 'error',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
      },
    ],

    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.cjs', '*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
}

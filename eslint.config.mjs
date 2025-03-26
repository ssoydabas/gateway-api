import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsParser from '@typescript-eslint/parser';
import checkFile from 'eslint-plugin-check-file';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: ['node_modules/*', 'dist/*', 'test/*', '__mocks__/*'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['src/**/*.ts'],

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      'linebreak-style': ['error', 'unix'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports (e.g., styles, polyfills)
            ['^\\u0000'],

            // Node.js built-ins prefixed with node:
            ['^node:'],

            // Third-party packages (npm packages)
            ['^@?\\w'],

            // Absolute imports from the src directory
            [
              '^@/controllers',
              '^@/middlewares',
              '^@/models',
              '^@/routes',
              '^@/services',
              '^@/utils',
              '^@/config',
              '^@/types',
            ],

            // Relative imports (from parent, sibling, or index)
            ['^\\..*\\.(js|ts)?$', '^\\./'],
          ],
        },
      ],

      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/no-default-export': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'node/no-missing-import': 'off', // Disabled because it conflicts with TypeScript's path aliases
      'node/no-unsupported-features/es-syntax': 'off', // Disabled because we are using TypeScript
    },
  },
  {
    files: ['src/**/*'],

    plugins: {
      'check-file': checkFile,
    },

    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.ts': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
];

export default config;

"use strict";

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    // Typescript
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",

    // ESLint
    quotes: "off",
    "no-console": "error",
    "no-use-before-define": "error",
  },
};

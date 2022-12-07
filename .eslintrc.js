const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': OFF,
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    'vue/multi-word-component-names': OFF,
    'no-prototype-builtins': OFF,
    'vue/no-v-html': OFF,
    'no-async-promise-executor': OFF,
    'vue/require-default-prop': OFF
  }
}

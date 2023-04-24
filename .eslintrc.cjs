/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/component-tags-order': ['error', {
      order: [ 'script', 'template', 'style' ]
    }],
  }
}

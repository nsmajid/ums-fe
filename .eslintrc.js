module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 12
  },
  extends: [
    // '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': 'off',
    'eol-last': 'off',
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'off',
    'vue/no-v-for-template-key': 'off'
  },
  globals: {
    _: true
  }
}

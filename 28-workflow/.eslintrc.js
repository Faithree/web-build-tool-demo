module.exports = {
  extends: ['eslint-config-ali', 'prettier', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': 'error',
    strict: 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'require-yield': 'off',
  },
  plugins: ['prettier'],
  globals: {
    React: 'readable',
  },
};

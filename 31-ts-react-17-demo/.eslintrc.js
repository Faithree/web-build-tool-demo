module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-console': 0,
    'no-new': 0,
    'no-case-declarations': 0,
    'react/jsx-tag-spacing': 0,
    'react/no-danger': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'no-param-reassign': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'no-undef':2,
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'always'], // 结束添加分号
  },
};

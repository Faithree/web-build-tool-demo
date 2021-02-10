// babel.config.js
// targets推荐使用.browserslistrc替换
const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  ['@babel/preset-typescript'],
  ["@babel/preset-react", {
    "runtime": "automatic"
  }]
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
];
module.exports = {
  presets,
  plugins,
  exclude: ['src/**/*.spec.(js|ts)', 'src/**/*.test.(js|ts)'],
  comments: false,
};

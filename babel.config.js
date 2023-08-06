module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@entities": "./src/entities",
        "@repositories": "./src/repositories",
        "@providers": "./src/providers",
        "@controllers": "./src/controllers",
        "@config": "./src/config",
        "@services": "./src/services",
        "@utils": "./src/utils",
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    
    config.module.rules.push(
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader:  require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      }
    );
    
    config.resolve.modules.push(path.resolve(__dirname, '../src'));
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};

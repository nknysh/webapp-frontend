const path = require('path');
const { prop, equals, pipe } = require('ramda');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const getMode = prop('mode');
const isDev = equals('development');

const modeIsDev = pipe(getMode, isDev);

const {
  WEBPACK_DEV_HOSTNAME = 'localhost',
  WEBPACK_DEV_PROXY = 'http://localhost:8002',
  SENTRY_ENV = '',
} = process.env;

const sourcePath = 'src';
const distPath = 'dist';

const baseManifest = require('./manifest');

module.exports = (env, argv) => ({
  mode: getMode(argv),
  devtool: modeIsDev(argv) && 'source-map',
  devServer: {
    historyApiFallback: true,
    host: WEBPACK_DEV_HOSTNAME,
    port: 8080,
    proxy: {
      '/api/**': {
        target: WEBPACK_DEV_PROXY,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  entry: ['@babel/polyfill', path.resolve(__dirname, sourcePath, 'index.jsx')],
  output: {
    path: path.resolve(__dirname, distPath),
    filename: 'app.[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, sourcePath), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: Infinity,
      maxSize: 500000,
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(woff(2)?|otf|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/img/',
            },
          },
        ],
      },
      {
        test: /\.(mp4|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/video/',
            },
          },
        ],
      },
      {
        test: /\.(xml|webmanifest|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new SentryWebpackPlugin({
      include: '.',
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: 'sentry.properties',
      release: SENTRY_ENV,
      dryRun: !SENTRY_ENV,
      silent: !SENTRY_ENV,
    }),
    new DotEnvPlugin({
      safe: true,
      systemvars: true,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, sourcePath, 'index.html'),
    }),
    // new OfflinePlugin({
    //   appShell: '/',
    //   externals: ['/'],
    // }),
    new WebpackPwaManifest({
      ...baseManifest,
      icons: [
        {
          src: path.resolve(__dirname, sourcePath, 'public', 'assets', 'img', 'PE_logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
  ],
});

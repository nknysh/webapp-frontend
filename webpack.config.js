const path = require('path');
const { prop, equals, pipe } = require('ramda');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');

const getMode = prop('mode');
const isDev = equals('development');

const modeIsDev = pipe(
    getMode,
    isDev
);

module.exports = (env, argv) => ({
    devtool: modeIsDev(argv) && 'source-map',
    devServer: { 
        historyApiFallback: modeIsDev(argv),
        proxy: {
            '/api/**': {
                target: 'http://localhost:8001',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
              },
        }
    },
    entry: [
        '@babel/polyfill', 
        path.resolve(__dirname, 'src', 'index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(woff(2)?|otf|ttf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            {
                test: /\.(svg|png|jpeg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'assets/img/'
                    }
                }]
            },
            {
                test: /\.(mp4|ogg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'assets/video/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "raw-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new DashboardPlugin({ port: 3001 }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new DotEnvPlugin({ path: path.resolve(__dirname, '.env')})
    ]
})
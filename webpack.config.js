const path = require('path');
const { defaultTo } = require('ramda');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = defaultTo('development', process.env.NODE_ENV);
const isDev = env === 'development';

const config = {
    entry: [
        '@babel/polyfill', 
        path.resolve(__dirname, 'src', 'index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
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
    ]
}

// dev options
if (isDev) {
    config.devtool = 'source-map';
    config.devServer = { historyApiFallback: true };
}

module.exports = config
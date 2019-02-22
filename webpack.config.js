const path = require('path');
const { defaultTo } = require('ramda');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = defaultTo('development', process.env.NODE_ENV);
const isDev = env === 'development';

const config = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(woff(2)?|otf|ttf|eot|svg|png|jpeg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
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
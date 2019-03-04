const path = require('path');
const { defaultTo } = require('ramda');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    resolve: {
        modules: [path.resolve(__dirname, '../src'), '../node_modules'],
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
                test: /\.(woff(2)?|otf|ttf|eot|svg|png|jpeg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
}
module.exports = config
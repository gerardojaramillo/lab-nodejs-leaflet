
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpachPlugin = require('copy-webpack-plugin');

const styleRule = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
}

const jsRule = {
    test: /\.(?:js|mjs|cjs)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            sourceType: 'module',
            targets: 'defaults',
            presets: [['@babel/preset-env']]
        }
    }
}

const rules = [styleRule, jsRule];

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: rules
    },
    resolve: {
        extensions: ['.js', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpachPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/geo/geo.geojson'),
                    to: 'geo.geojson'
                }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        host: '0.0.0.0',
        port: 8080,
        open: true,
        hot: true,
    },
}
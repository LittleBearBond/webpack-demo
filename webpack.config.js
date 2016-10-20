//https://segmentfault.com/a/1190000006863968
const webpack = require('webpack');
const path = require('path');
const jsDir = path.join(__dirname, './src/js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: {

    },
    cache: true,
    debug: true,
    devtool: 'sourcemap',
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': path.resolve(__dirname, './src/styles'),
            'components': path.resolve(__dirname, './src/components/')
        }
    },
    output: {
        publicPath: '/',
        //这个路径配置 真TM的坑啊
        path: path.resolve(__dirname, './build'),
        filename: '[name]/entry.js', //.[hash:8] // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
        chunkFilename: '[id].bundle.js', //.[hash:8]
    },
    module: {
        noParse: [],
        loaders: [{
            test: /(\.css|\.scss)/,
            loader: ExtractTextPlugin.extract('style!css!postcss!sass?outputStyle=expanded'),
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url?limit=8192'
        }]
    },
    externals: {
        'jquery': 'window.jQuery',
    },
    plugins: []
};

//get entry
['index', 'list', 'application'].forEach(val => {
    config.entry['js/' + val] = path.resolve(jsDir, `./${val}`);
});

//CommonsChunkPlugin  https://segmentfault.com/a/1190000006871991
var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons', // 这公共代码的chunk名为'commons'
    filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
    minChunks: 3, // 设定要有4个chunk（即3个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
});

config.plugins.push(commonsChunkPlugin);

module.exports = config;
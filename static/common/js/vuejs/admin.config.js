//定义常量路径
const   PATH = require('path'),
        WEBPACK = require('webpack'),
        ENTRY_FILE = PATH.resolve(__dirname,'../vuejs/admin.js'),//入口文件路径
        OUTPUT_FILE = PATH.resolve(__dirname, '../dist'),//输出文件路径
        ExtractTextPlugin = require("extract-text-webpack-plugin"),
        HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {//模块输出
    entry:{
        page:[ENTRY_FILE],//定义入口文件
    },
    output:{
        path:OUTPUT_FILE,//输出路径
        publicPath:'/',
        filename: '[name].js?t=[hash:5]',
    },
    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css']
    },
    externals:['jQuery'],
    module: {
        rules: [{
            test: require.resolve('jQuery'),
            use: [{
                  loader: 'expose-loader',
                  options: 'jQuery'
            },{
                  loader: 'expose-loader',
                  options: '$'
            }]
        },{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    //root: resolve(__dirname, 'src'),
                    attrs: ['img:src', 'link:href']
                }
           }]
        },{
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            //loader: 'babel-loader'
            use: ['babel-loader'],
        },{
            test: /\.vue$/,
            use: ['vue-loader']
        },{
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
                publicPath: PATH.resolve(__dirname, '../dist/')
            })
        },{
            test: /\.less/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: "css-loader!less-loader",
                publicPath: PATH.resolve(__dirname, '../dist/')
            })
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: 'imgs/[name].[hash:7].[ext]'
                }
            }]
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                query: {
                    limit: 5000,
                    name: '/fonts/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new WEBPACK.optimize.UglifyJsPlugin({
            test: /(\.js|\.vue)$/,
            compress: {
                warnings: false
            },
            comments: false
        }),
        new WEBPACK.LoaderOptionsPlugin({
            test:/\.vue$/,//把.vue组件里的css分离出来
            options: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                          fallback:'vue-style-loader',
                          use:'css-loader'
                        })
                    },
                },
            }
        }),
        new WEBPACK.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.js' }),
        new ExtractTextPlugin('vue.css?t=[hash:5]')//css分离
    ],


}

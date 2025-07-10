// https://github.com/guojiongwei/webpack5-vue3-ts
// https://juejin.cn/post/7091545579003576333
// import * as path from 'path';
import { fileURLToPath, URL } from 'node:url';
// in case you run into any typescript error when configuring `devServer`
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import postcssPresetEnv from 'postcss-preset-env';
import { VueLoaderPlugin } from 'vue-loader';
import { Configuration as WebpackConfiguration } from 'webpack';
import 'webpack-dev-server';

const config: WebpackConfiguration = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
    output: {
        path: fileURLToPath(new URL('../server/dist', import.meta.url)), // 打包结果输出路径
        filename: 'js/[name].js', // 每个输出js的名称，多文件入口
        clean: true,
        publicPath: '/public/',  // 打包后文件的公共前缀路径
    },
    plugins: [
        // 生成HTML index入口文件
        new HtmlWebpackPlugin({
            template: './index.html',
            // inject: true, // 自动注入静态资源
        }),
        // 提取CSS到单独文件中
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/chunk.[contenthash].css',
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            // 处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            defaultExport: true, // 解决warning问题，支持 import default from '...' 写法
                        }
                    },
                    // 'style-loader', // wp官方推荐不要同时使用mini插件和这个
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                ], // "sass-loader"
            },
            // 处理vue文件
            {
                test: /\.vue$/, // 匹配.vue文件
                use: 'vue-loader', // 用vue-loader去解析vue文件
            },
            // 处理ts、tsx文件
            {
                test: /\.(ts|tsx)$/,
                // TODO
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            rootMode: 'upward',
                            cacheDirectory: true,
                        },
                        // 预处理兼容，可以放进babel的config里
                        // presets: [
                        //     '@babel/preset-typescript',
                        //     '@babel/preset-env',
                        // ],
                    },
                ],
                exclude: /node_modules/,
            },
            // 处理html文件
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            // 处理图片 
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]',
                },
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.vue'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
}

export default config;
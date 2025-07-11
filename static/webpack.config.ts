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
    mode: 'production', //process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
    output: {
        path: fileURLToPath(new URL('../server/dist', import.meta.url)), // 打包结果输出路径
        filename: 'js/[name].js', // 每个输出js的名称，多文件入口
        chunkFilename: 'js/chunk.[contenthash].js',
        clean: true,
        publicPath: '/public/',  // 打包后文件的公共前缀路径
    },
    plugins: [
        // 生成HTML index入口文件
        new HtmlWebpackPlugin({
            template: './index.html',
            // templateContent: () => {
            //     // 读取原始的 index.html 内容
            //     let html = readFileSync(fileURLToPath(new URL('./index.html', import.meta.url)), 'utf-8');
            //     // 如果是生产环境，移除 Vite 相关的 script 标签
            //     html = html.replace(/<script type="module" src="\/src\/main\.ts"><\/script>/, '');
            //     return html;
            // },
            // // 当使用 templateContent 时，你可能需要手动控制注入位置
            inject: true, // 注入到 head 标签
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
            // --- 处理来自 node_modules 的全局 CSS (包括 Element Plus CSS) ---
            {
                test: /\.css$/,
                include: /node_modules/, // 只处理 node_modules 里的 CSS
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            defaultExport: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            importLoaders: 1,
                            // 这里不开启 modules，让 Element Plus 的全局 CSS 生效
                            modules: false, // 关键：禁用 CSS Modules
                        },
                    },
                ],
            },
            // --- 处理你自己的本地 CSS 文件 需要开启 CSS Modules ---
            {
                test: /\.css$/,
                exclude: /node_modules/, // 排除 node_modules 里的 CSS
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
                            // 你可以在这里继续使用 CSS Modules 配置，如果你希望自己的 CSS 模块化
                            modules: {
                                localIdentName: '[name]--[hash:base64:5]',
                            },
                        },
                    },
                ],
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
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.vue', '.css'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
}

export default config;
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html'; // 导入插件
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(), createHtmlPlugin({
            minify: true, // 生产环境可以开启 HTML 压缩
            inject: {
                // 在开发模式下注入你的 main.ts 脚本
                data: {
                    injectScript: '<script type="module" src="/src/main.ts"></script>',
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:20208',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})

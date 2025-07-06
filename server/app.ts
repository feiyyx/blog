// app.ts
import { Application } from 'egg';
// import { applyMiddlewares } from './app/decorator/middleware'; // 假设装饰器文件路径

export default class AppBootHook {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    async didReady() {
        // 所有的插件都已启动，可以执行一些初始化操作
        // applyMiddlewares(this.app);
        this.app.logger.info('Middlewares applied successfully!');
    }
}

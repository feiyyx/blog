import type { Application, Context } from 'egg';

export default function testMiddleware(options: any, app: Application) {
    return async (ctx: Context, next: any) => {
        ctx;
        app;
        console.log('options: ', options);
        await next();
    };
}

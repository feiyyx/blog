import type { Context } from 'egg';

export default function testMiddleware(options: any) {
    return async (ctx: Context, next: any) => {
        ctx;
        console.log('testMiddleware', options);
        await next();
    };
}

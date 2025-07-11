import type { Context } from 'egg';

export default function testMiddleware(options: any) {
    return async (ctx: Context, next: any) => {
        ctx;
        console.log('options123123123123123123121111111111111111: ', options);
        await next();
    };
}

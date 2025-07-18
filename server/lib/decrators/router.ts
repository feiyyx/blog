/* eslint-disable @typescript-eslint/indent */
// https://juejin.cn/post/6844904100589469710?searchId=20250630165516923B723D48B479097029
import { Application, Context } from 'egg';
import 'reflect-metadata';
import { RequestMethod } from './constant';
import { ROUTER_CONTROLLER_METHOD_PREFIX, ROUTER_CONTROLLER_PREFIX } from './metadata';
import { RouterControllerMetaData, RouterControllerMethodInfo, RouterControllerMethodMetaData } from './model';
let controllerProtype: object = {};

const initControllerPrototype = (targetClass: any) => {
    if (!Object.values(controllerProtype).length) {
        const prototype = Object.getPrototypeOf(targetClass);
        controllerProtype = targetClass.prototype || prototype;
    }
};

/**
 * @description controller装饰器，设置公共路径
 * @param pathPrefix 路由公共前缀
 * 可能会不存在
 * target 为 class的constructor
 */
export const Router = (pathPrefix: string = ''): ClassDecorator => (targetClass): void => {
    // 使用 ROUTER_CONTROLLER_PREFIX 作为元数据key标识controller层装饰器
    // 元数据的值为 pathPrefix
    // 将该元数据挂载到targetClass上
    initControllerPrototype(targetClass);
    const routerMetaData = {
        pathPrefix,
        middlewares: [],
    };

    const metadata = Reflect.getMetadata(ROUTER_CONTROLLER_PREFIX, controllerProtype) || {};

    metadata[targetClass.name] = routerMetaData;

    Reflect.defineMetadata(ROUTER_CONTROLLER_PREFIX, metadata, controllerProtype);
};

/**
 * @description controller装饰器，设置公共路径
 * @param pathPrefix 路由公共前缀
 * target 为 class 本身，还没有到constructor
 */
const methodWarpper = (path: string, requestMethod: RequestMethod): MethodDecorator => (targetClass: any, methodName: string | symbol): void => {
    initControllerPrototype(targetClass);
    const className = targetClass.constructor.name;
    const routerMetaData: RouterControllerMethodInfo = {
        path: [path],
        requestMethod,
        middlewares: [],
        methodName,
        className,
        constructorFunction: targetClass.constructor,
    };

    const metadata: RouterControllerMethodMetaData = Reflect.getMetadata(ROUTER_CONTROLLER_METHOD_PREFIX, controllerProtype) || {};
    const key = className + methodName.toString();
    const methodInfo = metadata[key];
    if (methodInfo) {
        if (methodInfo.path.length) {
            methodInfo.path.push(path);
        } else {
            methodInfo.path = [path];
        }
        metadata[key] = methodInfo;
    } else {
        metadata[key] = routerMetaData;
    }

    Reflect.defineMetadata(ROUTER_CONTROLLER_METHOD_PREFIX, metadata, controllerProtype);
};

const handleClassMiddlewareDecrator = (target: any, middleware: any) => {
    const className: string = target.name.toString();
    const metadata: RouterControllerMetaData = Reflect.getMetadata(ROUTER_CONTROLLER_PREFIX, target) || {};

    if (!metadata[className]) {
        metadata[className] = {
            pathPrefix: '',
            middlewares: [middleware],
        };
    } else {
        metadata[className].middlewares.push(middleware);
    }

    Reflect.defineMetadata(ROUTER_CONTROLLER_PREFIX, metadata, controllerProtype);
};

const handleMethodMiddlewareDecrator = (target: any, middleware: any, methodName: string | symbol) => {
    const className: string = target.constructor.name.toString();
    const key = className + methodName.toString();
    const metadata: RouterControllerMethodMetaData = Reflect.getMetadata(ROUTER_CONTROLLER_METHOD_PREFIX, controllerProtype) || {};

    if (!metadata[key]) {
        metadata[key] = {
            path: [], // 小写驼峰转-小写
            requestMethod: RequestMethod.GET, // 默认为get方法
            middlewares: [middleware],
            methodName,
            className,
            constructorFunction: target.constructor,
        };
    } else {
        metadata[key].middlewares.push(middleware);
    }

    Reflect.defineMetadata(ROUTER_CONTROLLER_METHOD_PREFIX, metadata, controllerProtype);
};

// 此时存储有两种情况
// 1. 类装饰器挂载中间件
// 2. 方法装饰器挂载中间件
export const UseMiddleware = (middleware: any, customOptions?: object | null) =>
    (target: any, propName: string | symbol, descriptor: PropertyDescriptor) => {
        if (customOptions) {
            middleware = middleware(customOptions);
        }
        initControllerPrototype(target);

        // 类上的装饰器
        if (typeof target === 'function' && !propName) {
            handleClassMiddlewareDecrator(target, middleware);
        } else {
            // 方法上的装饰器
            handleMethodMiddlewareDecrator(target, middleware, propName);
        }

        return descriptor;
    };

// post请求装饰器
export const HttpPost = (path: string = ''): MethodDecorator =>
    methodWarpper(path, RequestMethod.POST);

// get请求装饰器
export const HttpGet = (path: string = ''): MethodDecorator =>
    methodWarpper(path, RequestMethod.GET);

// put请求装饰器
export const HttpPut = (path: string = ''): MethodDecorator =>
    methodWarpper(path, RequestMethod.PUT);

export const handleRouter = (app: Application) => {
    const { router } = app;

    const controllerPrefix: RouterControllerMetaData = Reflect.getMetadata(ROUTER_CONTROLLER_PREFIX, controllerProtype);
    const methodMap: RouterControllerMethodMetaData = Reflect.getMetadata(ROUTER_CONTROLLER_METHOD_PREFIX, controllerProtype);

    Object.values(methodMap).forEach((curMethodData: RouterControllerMethodInfo) => {
        const { path, requestMethod, middlewares, methodName, className, constructorFunction } = curMethodData;
        const curController = controllerPrefix[className] || {};
        const { pathPrefix = '', middlewares: controllerMiddlewares = [] } = curController;
        if (path.length === 0) {
            path.push(methodName.toString().replace(/[A-Z]/g, match => `-${match.toLowerCase()}`));
        }
        path.forEach((curPath: string) => {
            const realpath = `${pathPrefix}${curPath === 'index' ? '' : curPath}`;
            app.logger.info(`register URL * ${requestMethod} ${realpath} * ${className}.${methodName.toString()}`);

            const wrap = async (ctx: Context, ...args: any[]): Promise<any> => {
                const controllerIns = new constructorFunction(ctx);
                const result = await controllerIns[methodName](...args);
                // const contentType = ctx.get('Content-Type');
                if (methodName !== 'index') {
                    ctx.body = {
                        code: 0,
                        data: result,
                        msg: 'success',
                    };
                }

            };
            router[requestMethod](realpath, ...controllerMiddlewares, ...middlewares, wrap);
        });
    });
};

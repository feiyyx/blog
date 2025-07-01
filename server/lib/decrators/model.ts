import { RequestMethod } from './constant';
export interface RouterControllerInfo {
    pathPrefix: string;
    middlewares: any[];
}
export interface RouterControllerMetaData {
    [key: string]: RouterControllerInfo
}

export interface RouterControllerMethodInfo {
    path: string;
    requestMethod: RequestMethod;
    middlewares: any[];
    methodName: string | symbol;
    className: string;
    constructorFunction: any;
}
export interface RouterControllerMethodMetaData {
    [key: string]: RouterControllerMethodInfo
}

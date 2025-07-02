// This file is created by egg-ts-helper@3.1.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHelloService from '../../../app/service/articleService.js';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;

declare module 'egg' {
    interface IService {
        helloService: AutoInstanceType<typeof ExportHelloService>;
    }
}

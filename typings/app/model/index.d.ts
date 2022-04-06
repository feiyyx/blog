// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/model/articles';

declare module 'egg' {
  interface IModel {
    Articles: ReturnType<typeof ExportArticles>;
  }
}

// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApi from '../../../app/controller/api';
import ExportArticle from '../../../app/controller/article';
import ExportArticleListBase from '../../../app/controller/articleListBase';
import ExportHome from '../../../app/controller/home';
import ExportLiveArticle from '../../../app/controller/liveArticle';
import ExportSearch from '../../../app/controller/search';
import ExportTechArticle from '../../../app/controller/techArticle';

declare module 'egg' {
  interface IController {
    api: ExportApi;
    article: ExportArticle;
    articleListBase: ExportArticleListBase;
    home: ExportHome;
    liveArticle: ExportLiveArticle;
    search: ExportSearch;
    techArticle: ExportTechArticle;
  }
}

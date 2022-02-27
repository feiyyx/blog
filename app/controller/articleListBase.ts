import { Controller } from 'egg';
import { markdown } from '../lib/markdown';
import { marked } from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
  breaks: false, // 默认为false。 允许回车换行。该选项要求 gfm 为true。
  pedantic: false, // 默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, // 对输出进行过滤（清理）
  smartLists: true,
  smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
});

export default class ListBaseController extends Controller {
  // 暂时固定分页数量为 10篇/页
  public async articleList(type: string = 'article') {
    let articleList;

    // 所有文章列表
    if (type === 'live') {
        const liveArticleList = await this.getAllArticleInfo(1, 'live');
        articleList = liveArticleList.allArticles.slice(0, 10);
    } else if (type === 'tech') {
        const techArticleList = await this.getAllArticleInfo(1, 'tech');
        articleList = techArticleList.allArticles.slice(0, 10);
    } else {
        articleList = await this.getAllArticleInfo(1);
        articleList = articleList.allArticles.slice(0, 10);
    }

    return articleList;
  }

  public async showList(type: string = 'article') {
    const { ctx } = this;
    const currentPage = +ctx.params.id;
    if (!currentPage || !Number.isInteger(currentPage)) {
      return ctx.redirect(`/${type}/`);
    }

    try {
      const aritclesInfo = await this.getAllArticleInfo(currentPage, type);
      const { allArticles, totalPage, pagination } = aritclesInfo;
      if (currentPage > totalPage) {
        return ctx.redirect(`/${type}/`);
      }
      const lastPage = currentPage - 1;
      const paginatingStart = currentPage === 1 ? lastPage * 10 : lastPage * 10 + 1
      const paginatingEnd = currentPage === 1 ? currentPage * 10 : currentPage * 10 + 1
      const articleList = allArticles
        .slice(paginatingStart, paginatingEnd)
        .filter(v => !!v);

      return {
        articles: articleList,
        pagination,
        currentPage,
        totalPage,
      };
    } catch (error) {
      console.error(error);
      ctx.response.status = 404;
    }
  }

  getPagination(allArticles: Array<Object>, totalPage: number, currentPage: number) {
    const length = allArticles.length;
    if (length < 20) {
      return [];
    } else if (length < 10 * 3) {
      return [2];
    } else {
      if (currentPage === 1 || currentPage === 2) {
        return [2, 3];
      } else if (currentPage === totalPage) {
        return this.range(currentPage - 2, totalPage);
      } else if (currentPage >= 3 && currentPage > totalPage - 2) {
        return this.range(currentPage - 1, totalPage);
      } else if (currentPage >= 3 && currentPage < totalPage) {
        return this.range(currentPage - 1, currentPage + 2);
      }
    }
  }

  async getAllArticleInfo(currentPage: number, articleType: string = 'article') {
    let allArticles, totalPage, pagination;
    const list = await markdown();
    const { techArticleList, liveArticleList, allArticleList } = list;
    if (articleType === 'live') { 
      allArticles = liveArticleList.reverse();
      totalPage = Math.ceil(allArticles.length / 10);
      pagination = this.getPagination(allArticles, totalPage, currentPage);
    } else if (articleType === 'tech') {
      allArticles = techArticleList.reverse();
      totalPage = Math.ceil(allArticles.length / 10);
      pagination = this.getPagination(allArticles, totalPage, currentPage);
    } else {
      // 兜底为all类型
      allArticles = allArticleList.reverse();
      totalPage = Math.ceil(allArticles.length / 10);
      pagination = this.getPagination(allArticles, totalPage, currentPage);
    }
    
    return {
      allArticles,
      totalPage,
      pagination,
    }
  }

  range(start, stop) {
    return Array(stop - start)
      .fill(start)
      .map((x, y) => x + y)
  }
}

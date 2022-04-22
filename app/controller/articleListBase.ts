import { Controller } from 'egg';
import { marked } from 'marked';

interface sqlQuery {
    limit: number;
    offset: number;
    order:Array <Array <string>>;
    raw: boolean;
    where?: undefined | object;
    attributes?: undefined | Array<string>;
}

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
    get pageSize() {
        return 10;
    }
  // 暂时固定分页数量为 10篇/页
  public async articleList(type: string = 'article') {
    let articleList;

    // 所有文章列表
    if (type) {
        articleList = await this.app.model.Articles.findAll({
            where: {
                tag: type,
            },
            limit: this.pageSize,
            order:[
                ["id","DESC"]
            ],
            raw: true,
        })
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
      return ctx.redirect(`/${type}/1`);
    }

    try {
      const aritclesInfo = await this.getAllArticleInfo(currentPage, type);
      const { allArticles: articleList, totalPage, pagination } = aritclesInfo;
      if (currentPage > totalPage) {
        return ctx.redirect(`/${type}/`);
      }

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

  getPagination(total: number, totalPage: number, currentPage: number) {
    const length = total;
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
    let query: sqlQuery = {
        limit: this.pageSize,
        offset: (currentPage - 1 ) * this.pageSize,
        order:[
            ["id","DESC"]
        ],
        raw: true,
    };
    if (articleType !== 'article') { 
        query.where = {
            tag: articleType,
        }
    }
    const res = await this.app.model.Articles.findAndCountAll(query);
    allArticles = res.rows;
    totalPage = Math.ceil(+res.count / 10);
    pagination = this.getPagination(+res.count, totalPage, currentPage);
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

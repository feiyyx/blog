import { Controller } from 'egg';
import { marked } from 'marked';
import { articlePlusTime } from '../interface/sql';

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

    get articleService() {
        return this.ctx.service.article;
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
                ["create_time","DESC"]
            ],
            raw: true,
        })
    } else {
        articleList = await this.getAllArticleInfo(1);
    }

    return articleList;
  }

  public async showList(currentPage: number = 1,type: string = 'article'): Promise<any> {
    const { ctx } = this;
    if (!currentPage || !Number.isInteger(currentPage)) {
      return ctx.redirect(`/${type}/1`);
    }

    try {
      const aritclesInfo = await this.getAllArticleInfo(currentPage, type);
      const { allArticles: articleList, totalPage, pagination } = aritclesInfo;
      if (currentPage > totalPage) {
        return ctx.redirect(`/${type}/1`);
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


  async getAllArticleInfo(currentPage: number, articleType: string = 'article') {
    const res = await this.articleService.getArticleList(currentPage, articleType);
    return res;
  }


  async getArticleInfo(name: string): Promise<articlePlusTime> {
    const res = await this.articleService.getArticle(name);
    return res;
  }
}

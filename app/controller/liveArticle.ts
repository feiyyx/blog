import BaseController from './articleListBase';

export default class ArticleController extends BaseController {
  get type() {
    return 'live';
  }
  public async index() {
    const { ctx } = this;
    ctx.params.id = 1;

    // 所有文章列表
    const liveArticleListInfo = await super.showList(1, this.type);
    await ctx.render('articleList', {
      title: `feiyyx's blog`,
      type: this.type,
      currentPage: 1,
      ...liveArticleListInfo
    });
  }
 
  public async show() {
    const liveArticleListInfo = await super.showList(1, this.type);

    await this.ctx.render('articleList', {
      title: `feiyyx's blog`,
      type: this.type,
      ...liveArticleListInfo,
    });
  }
}

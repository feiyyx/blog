import { marked } from 'marked';
import BaseController from './articleListBase';
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


export default class ArticleController extends BaseController {
  public async index() {
    // 所有文章列表
    const articleListInfo = await super.showList();

    await this.ctx.render('articleList', {
      title: `feiyyx's blog`,
      ...articleListInfo,
    });
  }
 
  public async show() {
    const { ctx } = this;
    const searchParam = ctx.params.id;
    let articleListInfo: (articlePlusTime |Array<articlePlusTime>);
    try {
      if (Number.isInteger(+searchParam)) {
        articleListInfo = await super.showList();
        return this.ctx.render('articleList', {
          title: `feiyyx's blog`,
          ...articleListInfo,
        });
      } else {
        // TODO ES搜索
        articleListInfo = await super.getArticleInfo(searchParam);
        return this.ctx.render('article', {
          title: `${articleListInfo.title} | feiyyx's blog`,
          time: articleListInfo.time,
          text: articleListInfo.content,
        });
      }
    } catch (error) {
      console.error(error);
      ctx.response.status = 404;
    }
  }

  async showArticle() {

  }

  async showPage() {
    
  }
}

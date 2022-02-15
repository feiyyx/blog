import * as fs from 'fs';
import * as path from 'path';
import { Controller } from 'egg';
import { marked } from 'marked';
// import highlight from 'highlight.js';
import { markdown } from '../lib/markdown';
import { decodeDate } from '../lib/handleDate';

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function(code, lang = 'javascript') {
  //   if (lang === 'vue') lang = 'javascript';
  //   return highlight.highlight(lang, code).value;
  // },
  gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
  breaks: false, // 默认为false。 允许回车换行。该选项要求 gfm 为true。
  pedantic: false, // 默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, // 对输出进行过滤（清理）
  smartLists: true,
  smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
});


export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;

    // 所有文章列表
    const list = await markdown();

    console.log(list);

    await ctx.render('index', {
      title: `feiyyx's blog`,
      articles: list.liveArticleList,
      pagination: 10,
      currentPage: 1,
      totalPage: 8,
    });
  }
 
  public async show() {
    const { ctx } = this;
    const name = ctx.params.id;

    try {
      // 所有文章列表
      const list = await markdown();
  
      // url解码文章名
      const mdName = decodeURI(name);
      const { techArticleList, liveArticleList } = list;
      const allArticles = [ ...techArticleList, ...liveArticleList ];
      const article = allArticles.find(v => v.title === mdName);
      const time = decodeDate(article?.time);
      const realName = `${time}@${article?.tag}@${article?.title}`;

      // 读取文章字符串
      const html = fs.readFileSync(path.join(__dirname, `../public/post/${realName}.md`), 'utf-8');

      // md转换成html
      const htmarkedHTMLml = marked(html);

      // 填充至模板返回
      await ctx.render('article', {
        title: `${mdName.split('@')[2]} | feiyyx`,
        text: htmarkedHTMLml,
      })
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  }
}

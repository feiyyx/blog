import * as fs from 'fs';
import * as path from 'path';
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

export default class HomeController extends Controller {
  // 暂时固定分页数量为 10篇/页
  public async index() {
    const { ctx } = this;

    // 所有文章列表
    const aritclesInfo = await this.getAllArticleInfo(1);
    const { allArticles, totalPage, pagination } = aritclesInfo;
    const articleList = allArticles.slice(0, 10);

    await ctx.render('index', {
      title: `feiyyx's blog`,
      articles: articleList,
      pagination,
      currentPage: 1,
      totalPage,
    });
    // ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
  }


  public async show() {
    const { ctx } = this;
    const currentPage = +ctx.params.id;
    if (!currentPage || !Number.isInteger(currentPage)) {
      return ctx.redirect(`/`);
    }

    try {
      const aritclesInfo = await this.getAllArticleInfo(currentPage);
      const { allArticles, totalPage, pagination } = aritclesInfo;
      if (currentPage > totalPage) {
        return ctx.redirect(`/`);
      }
      const lastPage = currentPage - 1;
      const paginatingStart = currentPage === 1 ? lastPage * 10 : lastPage * 10 + 1
      const paginatingEnd = currentPage === 1 ? currentPage * 10 : currentPage * 10 + 1
      const articleList = allArticles
        .slice(paginatingStart, paginatingEnd)
        .filter(v => !!v);

      await ctx.render('index', {
        title: `feiyyx's blog`,
        articles: articleList,
        pagination,
        currentPage,
        totalPage,
      });
    } catch (error) {
      console.error(error);
      ctx.response.status = 404;
    }
  }


  public async about() {
    const { ctx } = this;
    const mkPath = '../public/post/other/aboutme.md';
    
    let aboutme = await fs.readFileSync(path.join(__dirname, mkPath), 'utf-8');
    console.log('=======',aboutme)
    aboutme = marked(aboutme);
    console.log('=======',aboutme)

    await ctx.render('about', {
      title: `feiyyx's blog`,
      aboutme,
    });
  }

  getPagination(allArticles: Array<Object>, totalPage: number, currentPage: number) {
    const length = allArticles.length;
    console.log('currentpage ====', currentPage, length)
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

  async getAllArticleInfo(currentPage: number) {
    const list = await markdown();
    // const { techArticleList, liveArticleList, articleList } = list;
    const articleList = list.allArticleList;

    const allArticles = articleList.reverse();
    // [...techArticleList, ...liveArticleList].sort((a, b) => {
    //   const atime = a.time.split('-');
    //   const btime = b.time.split('-');

    //   const year = +atime[0] - +btime[0];
    //   const month = +atime[1] - +btime[1];
    //   const day = +atime[2] - +btime[2];
    //   if (year > 0) return 1;
    //   else if (month > 0) return 1;
    //   else return day;
    // });
    const totalPage = Math.ceil(allArticles.length / 10);
    const pagination = this.getPagination(allArticles, totalPage, currentPage);

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

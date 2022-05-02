import { Service } from 'egg';
import { sqlQuery, articlePlusTime } from '../interface/sql';
import * as moment from 'moment';
import { TYPE } from '../constants';

export default class Article extends Service {
    get pageSize() {
        return 10;
    }

    get articleModel() {
        return this.app.model.Articles;
    }

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getArticleList(currentPage: number, articleType: string = 'article'): Promise<any>  {
    let allArticles, totalPage, pagination;
    let query: sqlQuery = {
        limit: this.pageSize,
        offset: (currentPage - 1 ) * this.pageSize,
        order:[
            ["create_time","DESC"]
        ],
        raw: true,
    };
    if (articleType !== TYPE.ALL) { 
        query.where = {
            tag: articleType,
        }
    }
    const res = await this.articleModel.findAndCountAll(query);
    allArticles = res.rows;
    allArticles = allArticles.map(item => {
        const time = moment(item.create_time).format('YYYY MMM DD')
        return {
            ...item,
            time,
        }
    })
    totalPage = Math.ceil(+res.count / 10);
    pagination = this.getPagination(+res.count, totalPage, currentPage);
    return {
      allArticles,
      totalPage,
      pagination,
    }
  }

  /**
   * sayHi to you
   * @param name - your name
   */
   public async getArticle(title: string): Promise<articlePlusTime>  {
    const res = await this.articleModel.findOne({
        where: {
            title,
        },
        raw: true,
    });
    res.time = moment(res.create_time).format('YYYY-MM-DD hh:mm:ss');
    return res;
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
  range(start, stop) {
    return Array(stop - start)
      .fill(start)
      .map((x, y) => x + y)
  }
}

import { Controller } from 'egg';
import { HttpGet, Router, UseMiddleware } from '../../lib/decrators';
import testMiddleware from '../middleware/testMiddleware';

@Router('/api/article')
export default class ArticleController extends Controller {
    @HttpGet('/list')
    @UseMiddleware(testMiddleware({ test: 1 }))
    async getArticleList() {
        const { ctx } = this;
        const { page = 1, pageSize = 20 } = ctx.query;
        const result = await this.ctx.service.articleService.getArticleList(Number(page), Number(pageSize));
        const { count, rows } = result;
        return {
            total: count,
            data: rows,
        };
    }

    @HttpGet('/detail')
    async getArticle() {
        const { id } = this.ctx.query;
        const result = await this.ctx.service.articleService.getArticle(id);
        return result;
    }

    @HttpGet('/tags')
    async getTags() {
        const result = await this.ctx.service.articleService.getTags();
        const tagMap = result.reduce((map, tag) => {
            map[tag.id] = tag.name;
            return map;
        }, {});
        return tagMap;
    }
}

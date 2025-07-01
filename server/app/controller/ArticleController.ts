import { Controller } from 'egg';
import { HttpGet, Router, UseMiddleware } from '../../lib/decrators';
import testMiddleware from '../middleware/testMiddleware';

@Router('/api/article')
export default class ArticleController extends Controller {

    @HttpGet('/list')
    @UseMiddleware(testMiddleware)
    async getArticleList() {
        const { ctx, app } = this;
        console.log('app: ', app);
        const { page = 1, pageSize = 20 } = ctx.query;
        const result = await this.ctx.service.articleService.getArticleList(page, pageSize);
        this.ctx.body = result;
    }
}

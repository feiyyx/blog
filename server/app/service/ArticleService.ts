import { Service } from 'egg';

export default class ArticleService extends Service {
    // 封装业务
    async getArticleList(page: number, pageSize: number) {
        try {
            const startTime = Date.now();
            const result = await this.ctx.model.ArticlesModel.findAll({
                attributes: ['summary', 'title', 'tag', 'created_at'],
                order: [['created_at', 'DESC']],
                offset: (page - 1) * pageSize,
                limit: pageSize,
            });
            // 毫秒
            this.logger.info('查询文章列表成功，耗时：', Date.now() - startTime, 'ms');
            return result;
        } catch (e) {
            this.logger.error('获取文章列表失败' + e);
            throw e;
        }
    }
}

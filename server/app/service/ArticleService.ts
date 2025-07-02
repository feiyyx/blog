import { Service } from 'egg';

export default class ArticleService extends Service {
    // 封装业务
    async getArticleList(page: number, pageSize: number) {
        try {
            const startTime = Date.now();

            const result = await this.ctx.model.ArticlesModel.findAndCountAll({
                attributes: ['id', 'summary', 'title', 'tag', 'createdAt'],
                order: [['createdAt', 'DESC']],
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

    async getTags() {
        try {
            const startTime = Date.now();
            const result = await this.ctx.model.TagsModel.findAll({
                attributes: ['id', 'name'],
            });
            // 毫秒
            this.logger.info('查询标签列表成功，耗时：', Date.now() - startTime, 'ms');
            return result;
        } catch (e) {
            this.logger.error('获取标签列表失败' + e);
            throw e;
        }
    }
}

/* eslint-disable @typescript-eslint/no-var-requires */
const { mock, assert } = require('egg-mock/bootstrap');

describe('articleService 单元测试', () => {
    let app;
    before(() => {
        // 创建当前应用的 app 实例
        app = mock.app();
        // 等待 app 启动成功，才能执行测试用例
        return app.ready();
    });
    it('查询文章列表方法-数据存在', async () => {
        const ctx = app.mockContext();
        const query = { page: 1, pageSize: 20 };
        const result = await ctx.service.articleService.getArticleList(query.page, query.pageSize);
        const { count, rows } = result;
        assert(count);
        assert(rows);
    });

    it('查询文章列表方法-数据不存在', async () => {
        const ctx = app.mockContext();
        const query = { page: 100, pageSize: 20 };
        const result = await ctx.service.articleService.getArticleList(query.page, query.pageSize);
        const { count, rows } = result;
        assert(count);
        assert(!rows.length);
    });

    it('查询具体文章-数据存在', async () => {
        const ctx = app.mockContext();
        const id = 1;
        const result = await ctx.service.articleService.getArticle(id);
        assert(result);
    });

    it('查询具体文章-数据不存在', async () => {
        const ctx = app.mockContext();
        const id = 9999;
        const result = await ctx.service.articleService.getArticle(id);
        assert(!result);
    });

    it('查询标签数据', async () => {
        const ctx = app.mockContext();
        const result = await ctx.service.articleService.getTags();
        assert(result);
    });

});

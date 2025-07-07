/* eslint-disable @typescript-eslint/no-var-requires */
const { mock, assert } = require('egg-mock/bootstrap');

describe('Controller - articleController 单元测试', () => {
    let app;
    before(() => {
        // 创建当前应用的 app 实例
        app = mock.app();
        // 等待 app 启动成功，才能执行测试用例
        return app.ready();
    });
    it('GET查询文章列表 /api/article/list', async () => {
        app.mockCsrf();
        const result = await app
            .httpRequest()
            .get('/api/article/list')
            .query({
                page: 1,
                pageSize: 20,
            })
            .expect(200);
        const body = result.body;
        const { total, data } = body.data;
        assert(body.code === 0);
        assert(body.msg === 'success');
        assert(total > 0);
        assert(data.length > 0);
    });

    it('GET查询文章详情 /api/article/detail', async () => {
        app.mockCsrf();
        const result = await app
            .httpRequest()
            .get('/api/article/detail')
            .query({
                id: 1,
            })
            .expect(200);
        const body = result.body;
        assert(body.code === 0);
        assert(body.msg === 'success');
        assert(body.data.id === 1);
    });

    it('GET标签列表 /api/article/tags', async () => {
        app.mockCsrf();
        const result = await app
            .httpRequest()
            .get('/api/article/tags')
            .query()
            .expect(200);
        const body = result.body;
        assert(body.code === 0);
        assert(body.msg === 'success');
        assert(Object.keys(body.data).length > 0);
    });

});

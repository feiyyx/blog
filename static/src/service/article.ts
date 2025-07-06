import request from './request';

class Article {
    static async getArticleList(params: { page: number, pageSize?: number }): Promise<any> {
        return request({
            url: '/article/list',
            method: 'GET',
            params,
        })
    }

    static async getArticleDetail(id: number): Promise<any> {
        return request({
            url: '/article/detail',
            method: 'GET',
            params: {
                id,
            },
        })
    }

    static async getTagMap(): Promise<any> {
        return request({
            url: '/article/tags',
            method: 'GET',
        })
    }
}

export default Article;
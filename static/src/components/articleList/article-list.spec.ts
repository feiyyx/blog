import type { Article } from '@/model';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import styles from './article-list.module.css';
import ArticleList from './article-list.tsx';

const testArticleList: Article[] = [
    {
        id: 1,
        title: '测试文章',
        createdAt: 1684560000000,
        tag: '1',
        summary: '测试文章',
    },
    {
        id: 2,
        title: '测试文章2',
        createdAt: 1684560000000,
        tag: '2',
        summary: '测试文章2',
    },
]

describe('ArticleList 组件', () => {
    it('功能测试', () => {
        const wrapper = shallowMount(ArticleList, { props: { articles: testArticleList } })

        wrapper.findAll(`.${styles['article-card']}`).forEach((element, index) => {
            expect(element.attributes('href')).toBe(`/article/${testArticleList[index].id}`)
            expect(element.find(`.${styles['article-list-title']}`).text()).toBe(testArticleList[index].title)
            expect(element.find(`.${styles['article-summary']}`).text()).toBe(testArticleList[index].summary)
            console.log('element.find(`.el-button`): ', element.find(`.el-button`));

            // 获取 a标签上的 href 属性
            expect(element.find(`.${styles['read-more-button']}`).attributes('href')).toBe(`/article/${testArticleList[index].id}`)
        });
    })
})

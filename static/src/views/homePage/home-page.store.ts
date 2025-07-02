import type { Article } from '@/model';
import articleService from '@/service/article';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

// 初始化pinia
export const useHomePageStore = defineStore('homePage', () => {
    // state
    const articleList = ref<Article[]>(testArticleList);
    const total = ref<number>(0);
    const getArticleListState = computed(() => articleList.value);
    const getTotalState = computed(() => total.value);

    // action
    const getArticleListAction = async (params: { page: number, pageSize?: number }) => {
        const res = await articleService.getArticleList(params);
        articleList.value = res.data.map((item: any) => {
            const summary = item.summary + ' ......';
            return {
                ...item,
                summary,
            };
        });
        total.value = res.total;
        return res;
    }

    return {
        articleList,
        getArticleListAction,
        getArticleListState,
        getTotalState,
    }
})

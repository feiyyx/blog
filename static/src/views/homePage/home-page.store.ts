import type { Article } from '@/model';
import articleService from '@/service/article';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import styles from './home-page.module.css';

// TODO 优化成骨架屏
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
    const curPage = ref<number>(1);
    const catalogRef = ref<any[]>([]);
    const getArticleListState = computed(() => articleList.value);
    const getArticleTitleListState = computed(() => articleList.value.map((item: Article) => item.title));
    const getTotalState = computed(() => +total.value);
    const getCurPageState = computed(() => +curPage.value);

    const setCurPage = (page: number) => {
        curPage.value = page;
    }
    const setCatalogRef = (catalog: any, index: number) => {
        catalogRef.value[index] = catalog;
    }
    const resetCatalogRef = () => {
        catalogRef.value = [];
    }

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
    // 算法要缕清楚
    const handleScroll = () => {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let catalog = null;
        const articleList = document.querySelectorAll(
            'a[id^="article-"]',
        ) as NodeListOf<HTMLElement>;
        for (let i = articleList.length - 1; i >= 0; i--) {
            const el = articleList[i] as HTMLElement;
            if (scrollTop + 10 * 16 > el.offsetTop) {
                catalog = catalogRef.value[i];
                break;
            }
        }
        if (catalog) {
            const activeLink = document.querySelector(`.${styles['active']}`);
            if (activeLink) {
                activeLink.classList.remove(styles['active']);
            }
            catalog.classList.add(styles['active']);
        }
    };

    return {
        curPage,
        total,
        articleList,
        getArticleListAction,
        getArticleListState,
        getTotalState,
        getCurPageState,
        setCurPage,
        setCatalogRef,
        resetCatalogRef,
        getArticleTitleListState,
        handleScroll,
    }
})

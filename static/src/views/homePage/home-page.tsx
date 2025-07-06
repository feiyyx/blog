// 目录实现 https://qzy.im/blog/2020/02/generate-article-catalogs-and-switch-catalog-following-article-s-scroll-using-javascript/
import ArticleList from '@/components/articleList/article-list.tsx';
import ClientPageModel from '@/components/clientPageModel/client-page.tsx';
import { ElPagination } from 'element-plus';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import styles from './home-page.module.css';
import { useHomePageStore } from './home-page.store';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const loading = ref(false);
        const homePageStore = useHomePageStore();
        onMounted(async () => {
            loading.value = true;
            await homePageStore.getArticleListAction({ page: homePageStore.curPage });
            loading.value = false;
            window.addEventListener('scroll', homePageStore.handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', homePageStore.handleScroll);
        });

        return () => (
            <ClientPageModel loading={loading.value}>
                {{
                    mainPart: () => (
                        <div class={styles['home-page-main-wrapper']}>
                            <ArticleList articles={homePageStore.articleList} />
                            <div class={styles['pagination']}>
                                <ElPagination
                                    layout="prev, pager, next, total"
                                    v-model:total={homePageStore.total}
                                    v-model:currentPage={homePageStore.curPage}
                                    pageSize={20}
                                    onCurrent-change={(page: number) => {
                                        homePageStore.setCurPage(page);
                                        loading.value = true;
                                        homePageStore.resetCatalogRef();
                                        homePageStore
                                            .getArticleListAction({
                                                page: homePageStore.curPage,
                                            })
                                            .then(() => {
                                                loading.value = false;
                                            });
                                    }}
                                ></ElPagination>
                            </div>
                        </div>
                    ),
                    rightPart: () => (
                        <ul class={styles['home-page-right-part']}>
                            {homePageStore.getArticleTitleListState.map(
                                (title: string, index: number) => (
                                    <li>
                                        <a
                                            class={styles['home-page-catalog']}
                                            href={`#article-${index}`}
                                            title={title}
                                            key={title}
                                            ref={(el) => {
                                                if (el) {
                                                    homePageStore.setCatalogRef(el, index);
                                                }
                                            }}
                                        >
                                            {title}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    ),
                }}
            </ClientPageModel>
        );
    },
});

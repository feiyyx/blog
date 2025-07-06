import ArticleInfo from '@/components/articleInfo/article-info.tsx';
import ClientPageModel from '@/components/clientPageModel/client-page.tsx';
import { MdCatalog, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import styles from './article-page.module.css';
import { useArticlePageStore } from './article-page.store';

const scrollElement = document.documentElement;

export default defineComponent({
    name: 'ArticlePage',
    setup() {
        const articleStore = useArticlePageStore();
        const route = useRoute();

        onMounted(async () => {
            const id = Number(route.params.id);
            await articleStore.getArticleDetailAction(id);
        });
        return () => (
            <ClientPageModel>
                {{
                    mainPart: () => (
                        <div class={styles['article-page-main-part']}>
                            <div class={styles['article-page-breadcrumb']}>
                                <a href="/" class={styles['article-page-back']}>
                                    首页
                                </a>
                                &nbsp;/&nbsp;
                                <span class={styles['article-page-breadcrumb-title']}>
                                    {articleStore.getArticleDetailState?.title}
                                </span>
                            </div>

                            <div class={styles['article-countainer']}>
                                <h1 class={styles['article-title']}>
                                    {articleStore.getArticleDetailState?.title}
                                </h1>
                                <ArticleInfo
                                    class={styles['article-page-info']}
                                    date={articleStore.getArticleDetailState?.createdAt}
                                    category={articleStore.getArticleDetailState?.tag || ''}
                                />
                                <MdPreview
                                    editorId={'id'}
                                    modelValue={articleStore.getArticleDetailState?.content}
                                />
                            </div>
                        </div>
                    ),
                    rightPart: () => (
                        <div class={styles['article-right-part']}>
                            <MdCatalog editorId={'id'} scrollElement={scrollElement} />
                        </div>
                    ),
                }}
            </ClientPageModel>
        );
    },
});

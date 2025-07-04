import ArticleInfo from '@/components/articleInfo/article-info.tsx';
import type { Article } from '@/model';
import { ElButton } from 'element-plus';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import styles from './article-list.module.css';

export default defineComponent({
    name: 'ArticleList',
    props: {
        articles: {
            type: Array as PropType<Article[]>,
            required: true,
        },
        page: {
            type: Number,
            default: 1,
        },
    },
    setup(props) {
        return () => (
            <div>
                {props.articles.map((article, index) => (
                    <a
                        key={article.id}
                        class={styles['article-card']}
                        href={`/article/${article.id}`}
                        id={`article-${index}`}
                    >
                        <h2 class={styles['article-list-title']}>{article.title}</h2>
                        <ArticleInfo date={article.createdAt} category={article.tag} />
                        <p class={styles['article-summary']}>{article.summary}</p>
                        <ElButton
                            type="primary"
                            link
                            class={styles['read-more-button']}
                            href={`/article/${article.id}`}
                        >
                            {'阅读全文 >>'}
                        </ElButton>
                    </a>
                ))}
            </div>
        );
    },
});

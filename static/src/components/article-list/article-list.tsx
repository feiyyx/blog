import timeIcon from '@/assets/time.svg';
import { formatDate } from '@/utils';
import { ElButton, ElTag } from 'element-plus';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import styles from './article-list.module.css';

interface Article {
	id: number;
	title: string;
	date: number;
	category: string[];
	summary: string;
}

export default defineComponent({
	name: 'ArticleList',
	props: {
		articles: {
			type: Array as PropType<Article[]>,
			required: true,
		},
	},
	setup(props) {
		return () => (
			<div>
				{props.articles.map((article) => (
					<a
						key={article.id}
						class={styles['article-card']}
						href={`/article/${article.id}`}
					>
						<h2 class={styles['article-list-title']}>{article.title}</h2>
						<div class={styles['article-info']}>
							<span class={styles['article-date']}>
								<img class={styles['article-date-icon']} src={timeIcon} />
								{formatDate(article.date)}
							</span>
							<span>
								{article.category.map((cat) => (
									<ElTag
										key={cat + article.id}
										class={styles['article-category-tag']}
										size="default"
									>
										{cat}
									</ElTag>
								))}
							</span>
						</div>
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

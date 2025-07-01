import timeIcon from '@/assets/time.svg';
import { formatDate } from '@/utils';
import { ElTag } from 'element-plus';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import styles from './article-info.module.css';

export default defineComponent({
	name: 'ArticleInfo',
	props: {
		date: {
			type: Number,
			required: true,
		},
		category: {
			type: Array as PropType<string[]>,
			required: true,
		},
	},
	setup(props) {
		return () => (
			<div class={styles['article-info']}>
				<span class={styles['article-date']}>
					<img class={styles['article-date-icon']} src={timeIcon} />
					{formatDate(props.date)}
				</span>
				<span>
					{props.category.map((cat) => (
						<ElTag
							key={cat + props.date}
							class={styles['article-category-tag']}
							size="default"
						>
							{cat}
						</ElTag>
					))}
				</span>
			</div>
		);
	},
});

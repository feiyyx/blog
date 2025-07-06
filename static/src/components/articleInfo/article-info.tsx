import timeIcon from '@/assets/time.svg';
import { useGlobalValueStore } from '@/stores/common.store';
import { formatDate } from '@/utils';
import { ElTag } from 'element-plus';
import { computed, defineComponent } from 'vue';
import styles from './article-info.module.css';

export default defineComponent({
  name: 'ArticleInfo',
  props: {
    date: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const commonStore = useGlobalValueStore();
    const computedCategory = computed(() =>
      props.category
        .split(',')
        .map((cat: number | string) => commonStore.tagMap[Number(cat)] || cat.toString()),
    );

    return () => (
      <div class={styles['article-info']}>
        <span class={styles['article-date']}>
          <img class={styles['article-date-icon']} src={timeIcon} />
          {formatDate(props.date)}
        </span>
        <span>
          {computedCategory.value.map((cat: string) => (
            <ElTag key={cat + props.date} class={styles['article-category-tag']} size="default">
              {cat}
            </ElTag>
          ))}
        </span>
      </div>
    );
  },
});

import ArticleList from '@/components/articleList/article-list.tsx';
import ClientPageModel from '@/components/clientPageModel/client-page.tsx';
import { ElPagination } from 'element-plus';
import { defineComponent, onMounted } from 'vue';
import styles from './home-page.module.css';
import { useHomePageStore } from './home-page.store';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const homePageStore = useHomePageStore();
    onMounted(async () => {
      await homePageStore.getArticleListAction({ page: 1 });
    });
    return () => (
      <ClientPageModel>
        {{
          mainPart: () => (
            <div class={styles['home-page-main-wrapper']}>
              <ArticleList articles={homePageStore.articleList} />
              <div class={styles['pagination']}>
                <ElPagination
                  layout="prev, pager, next"
                  total={homePageStore.getTotalState}
                  currentPage={1}
                ></ElPagination>
              </div>
            </div>
          ),
        }}
      </ClientPageModel>
    );
  },
});

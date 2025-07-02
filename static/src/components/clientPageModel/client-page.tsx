import { ElRow } from 'element-plus';
import { defineComponent, renderSlot, SetupContext } from 'vue';
import Profile from '../profile/profile.tsx';
import styles from './client-page.module.css';

export default defineComponent({
  name: 'ClientPageModel',
  setup(props: Readonly<any>, { slots }: SetupContext) {
    return () => (
      <div class={styles['client-page-container']}>
        <ElRow gutter={20}>
          <Profile />
          {/* 展示栏 */}
          {slots.mainPart?.()}
          {/* 目录栏 */}
          {slots.rightPart ? renderSlot(slots, 'rightPart') : null}
        </ElRow>
      </div>
    );
  },
});

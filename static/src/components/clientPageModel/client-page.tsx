import { ElBacktop, ElLoading, ElRow } from 'element-plus';
import type { SetupContext } from 'vue';
import { defineComponent, ref, renderSlot, watch } from 'vue';
import Profile from '../profile/profile.tsx';
import styles from './client-page.module.css';

const loadingInstance = () =>
    ElLoading.service({
        lock: true,
        text: '数据加载中...',
        background: 'rgba(255, 255, 255, 0.6)',
        fullscreen: true,
    });
let loadingMask: any = null;

export default defineComponent({
    name: 'ClientPageModel',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Readonly<{ loading: boolean }>, { slots }: SetupContext) {
        const { loading } = props;
        const loadingRef = ref(loading);
        const backTopRef = ref<any>(null);

        watch(
            () => props.loading,
            (newVal) => {
                loadingRef.value = newVal;
                if (newVal) {
                    loadingMask = loadingInstance();
                } else {
                    loadingMask.close();
                }
                backTopRef.value?.$el?.click && backTopRef.value?.$el?.click();
            },
        );

        return () => (
            <div class={styles['client-page-container']}>
                <ElRow gutter={20}>
                    <Profile />
                    {/* 展示栏 */}
                    {slots.mainPart?.()}
                    {/* 目录栏 */}
                    {slots.rightPart ? renderSlot(slots, 'rightPart') : null}
                </ElRow>
                <ElBacktop ref={backTopRef} />
            </div>
        );
    },
});

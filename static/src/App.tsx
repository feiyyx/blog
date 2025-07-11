import { useGlobalValueStore } from '@/stores/common.store';
import { defineComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';

// 定义组件
export default defineComponent({
    name: 'App',
    setup() {
        const globalValueStore = useGlobalValueStore();
        onMounted(async () => {
            await globalValueStore.getTagMapAction();
        });
        return () => (
            <RouterView />
        );
    },
});
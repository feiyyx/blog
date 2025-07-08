import { useGlobalValueStore } from '@/stores/common.store';
import { defineComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';

const globalValueStore = useGlobalValueStore();
// 定义组件
export default defineComponent({
    name: 'App',
    components: {
        RouterView,
    },
    setup() {
onMounted(async () => {
    await globalValueStore.getTagMapAction();
        });
        return () => (
            <RouterView />
        );
    },
});
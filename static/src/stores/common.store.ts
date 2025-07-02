import type { TagMap } from '@/model';
import articleService from '@/service/article';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useGlobalValueStore = defineStore('globalValue', () => {
    const tagMap = ref<TagMap>({});
    const getTagMapState = computed(() => tagMap.value);

    async function getTagMapAction() {
        const res = await articleService.getTagMap();
        tagMap.value = res;
    }

    return { tagMap, getTagMapState, getTagMapAction }
})

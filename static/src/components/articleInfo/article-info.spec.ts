import { useGlobalValueStore } from '@/stores/common.store';
import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import styles from './article-info.module.css';
import ArticleInfo from './article-info.tsx';
const testTagMap = {
    1: '前端',
    2: '后端',
}

describe('ArticleInfo 组件', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('功能测试', () => {
        const commonStore = useGlobalValueStore();
        commonStore.tagMap = testTagMap;
        const testTagMapValue = Object.values(testTagMap);
        console.log('testTagMapValue: ', testTagMapValue);
        const wrapper = shallowMount(ArticleInfo, { props: { date: 1751614648, category: '1,2' } })

        expect(wrapper.find(`.${styles['article-date']}`).text()).toBe('2025-07-04 15:37:28')
        wrapper.findAll(`.${styles['article-category-tag']} .el-tag__content`).forEach((element, index) => {
            expect(element.text()).toBe(testTagMapValue[index])
        });
    })
})

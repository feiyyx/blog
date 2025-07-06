import { mount } from '@vue/test-utils';

import { describe, expect, it } from 'vitest';
import ClientPage from './client-page';
import style from './client-page.module.css';
const mainPartComponent = {
    name: 'maip-part-component',
    template: '<div class="main-part">main part</div>'
}

const rightPartComponent = {
    name: 'right-part-component',
    template: '<div class="right-part">right part</div>'
}

describe('ClientPage', () => {
    it('功能测试', () => {
        const wrapper = mount(ClientPage, {
            props: { loading: false }, slots: {
                mainPart: mainPartComponent,
                rightPart: rightPartComponent,
            }
        })

        const mainPart = wrapper.find(`.${style['client-page-container']} .el-row .main-part`);
        const rightPart = wrapper.find(`.${style['client-page-container']} .el-row .right-part`);
        mainPart.exists();
        rightPart.exists();
        expect(mainPart.text()).toBe('main part');
        expect(rightPart.text()).toBe('right part');

    });
});
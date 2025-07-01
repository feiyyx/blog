import { ElRow } from 'element-plus';
import { defineComponent, ref, renderSlot, SetupContext } from 'vue';
import Profile from '../profile/profile.tsx';
import styles from './client-page.module.css';

const articles = ref([
	{
		id: 1,
		title: '第一篇博客文章',
		date: 1750839386,
		category: ['前端', 'Vue'],
		summary: '这是第一篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 2,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端', 'Eggjs'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 3,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 4,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 5,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 6,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 7,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
	{
		id: 8,
		title: '第二篇博客文章',
		date: 1750925986,
		category: ['后端'],
		summary: '这是第二篇博客的摘要内容，简要介绍文章内容。',
	},
]);

const toc = ref([
	{ id: '1', title: '第一篇博客文章' },
	{ id: '2', title: '第二篇博客文章' },
]);

const activeToc = ref('1');

const iconList = () => {
	return;
};

export default defineComponent({
	name: 'HomePage',
	setup(props: Readonly<any>, { slots }: SetupContext) {
		return () => (
			<div class={styles['client-page-container']}>
				<ElRow gutter={20}>
					<Profile />
					{/* 展示栏 */}
					{renderSlot(slots, 'mainPart')}
					{/* 目录栏 */}
					{slots.rightPart ? renderSlot(slots, 'rightPart') : null}
				</ElRow>
			</div>
		);
	},
});

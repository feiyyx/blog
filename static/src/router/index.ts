import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/homePage/home-page.tsx'),
		},
		{
			path: '/index',
			name: 'otherIndex',
			redirect: '/',
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/loginPage/login-page.tsx'),
		},
		{
			path: '/article/:id',
			name: 'article',
			component: () => import('../views/articlePage/article-page.tsx'),
		},
		{
			path: '/404',
			name: '404',
			meta: {
				title: '404',
			},
			component: () => import('../views/notFoundPage/not-found-page.tsx'),
		},
		{
			path: '/:patchMatch(.*)',
			name: 'unknown',
			redirect: '/404',
		},
	],
});

export default router;

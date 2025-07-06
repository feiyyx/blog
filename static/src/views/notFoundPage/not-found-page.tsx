import { ElButton, ElResult } from 'element-plus';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NotFoundPage',
	setup() {
		const goHome = () => {
			window.location.href = '/';
		};

		return () => (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					background: '#f5f7fa',
				}}
			>
				<ElResult icon="error" title="404" subTitle="抱歉，您访问的页面不存在">
					{{
						extra: () => (
							<ElButton type="primary" onClick={goHome}>
								返回首页
							</ElButton>
						),
					}}
				</ElResult>
			</div>
		);
	},
});

import type { FormInstance, FormRules } from 'element-plus';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { checkPassword } from './login-page';
import styles from './login-page.module.css';

export default defineComponent({
	name: 'LoginPage',
	setup() {
		const formRef = ref();
		const form = ref({
			username: '',
			password: '',
		});
		const loading = ref(false);

		const rules = reactive<FormRules<typeof form>>({
			username: [
				{ required: true, message: '请输入用户名', trigger: 'blur' },
				{ min: 5, trigger: 'blur', message: '用户名长度不能小于5' },
			],
			password: [
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ validator: checkPassword, trigger: 'blur' },
			],
		});

		const submitForm = (formEl: FormInstance | undefined) => {
			if (!formEl) {
				return;
			}
			formEl.validate((valid) => {
				if (valid) {
					loading.value = true;
					// 模拟登录逻辑
					setTimeout(() => {
						loading.value = false;
						if (form.value.username === 'admin' && form.value.password === '123456') {
							ElMessage.success('登录成功');
						} else {
							ElMessage.error('用户名或密码错误');
						}
					}, 1000);
				} else {
					console.log('error submit!');
				}
			});
		};

		return () => (
			<div class={styles['login-container']}>
				<ElForm
					ref={formRef}
					model={form.value}
					label-width="80px"
					rules={rules}
					class={styles['login-form']}
				>
					<h2 class={styles['login-title']}>欢迎登录</h2>
					<ElFormItem label="用户名" prop="username">
						<ElInput
							v-model={form.value.username}
							placeholder="请输入用户名"
							clearable
						/>
					</ElFormItem>
					<ElFormItem label="密码" prop="password">
						<ElInput
							v-model={form.value.password}
							type="password"
							placeholder="请输入密码"
							show-password
							clearable
						/>
					</ElFormItem>
					<div class={styles['login-button']}>
						<ElButton
							type="primary"
							loading={loading.value}
							onClick={() => submitForm(formRef.value)}
							style={{ width: '100%' }}
							v-keyUp={{
								fn: () => submitForm(formRef.value),
							}}
						>
							登录
						</ElButton>
					</div>
				</ElForm>
			</div>
		);
	},
});

import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';
import { defineComponent } from 'vue';
import styles from './login-page.module.css';
import { useLoginPageStore } from './login-page.store';

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const loginPageStore = useLoginPageStore();

        return () => (
            <div class={styles['login-container']}>
                <ElForm
                    ref={loginPageStore.formRef}
                    model={loginPageStore.form}
                    label-width="80px"
                    rules={loginPageStore.rules}
                    class={styles['login-form']}
                >
                    <h2 class={styles['login-title']}>欢迎登录</h2>
                    <ElFormItem label="用户名" prop="username">
                        <ElInput
                            v-model={loginPageStore.form.username}
                            placeholder="请输入用户名"
                            clearable
                        />
                    </ElFormItem>
                    <ElFormItem label="密码" prop="password">
                        <ElInput
                            v-model={loginPageStore.form.password}
                            type="password"
                            placeholder="请输入密码"
                            show-password
                            clearable
                        />
                    </ElFormItem>
                    <div class={styles['login-button']}>
                        <ElButton
                            type="primary"
                            loading={loginPageStore.isLogin}
                            onClick={() => loginPageStore.submitForm(loginPageStore.formRef)}
                            style={{ width: '100%' }}
                            v-keyUp={{
                                fn: () => loginPageStore.submitForm(loginPageStore.formRef),
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

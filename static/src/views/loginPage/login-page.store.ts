// 根据login-page.ts 生成pinia版本的代码
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { LOGIN_STATUS, PASSPORT_MAX_LENGTH } from './constants';
interface VALID_RETURN {
    status: boolean;
    message: string;
}
export const useLoginPageStore = defineStore('loginPage', () => {
    const isLogin = ref(false);
    const formRef = ref();
    const form = ref({
        username: '',
        password: '',
    });

    const validatePassword = (passport: string): VALID_RETURN => {
        if (passport.trim().length === 0) {
            return {
                status: false,
                message: '请输入密码',
            };
        }
        if (passport.trim().length > PASSPORT_MAX_LENGTH) {
            return {
                status: false,
                message: '密码长度超出16字符',
            };
        }

        return {
            status: true,
            message: '',
        };
    };

    const checkPassword = (rule: any, value: string, callback: any) => {
        const result = validatePassword(value);
        if (result.status) {
            callback();
        } else {
            callback(new Error(result.message));
        }
    };

    const handleLogin = (account: string, passport: string) => {
        // 发送请求
        const result = {
            status: 0,
            message: '登录成功',
        };
        const status = result.status;
        if (status === LOGIN_STATUS.FAILURE) {
            console.log('登录失败', result.message);
        } else {
            isLogin.value = true;
        }
    };

    const rules = reactive<FormRules<typeof form.value>>({
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
                isLogin.value = true;
                // 模拟登录逻辑
                setTimeout(() => {
                    isLogin.value = false;
                    if (
                        form.value.username === 'admin' &&
                        form.value.password === '123456'
                    ) {
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
    return {
        formRef,
        form,
        isLogin,
        rules,
        submitForm,
        validatePassword,
        checkPassword,
        handleLogin,
    };
});

import { LOGIN_STATUS, PASSPORT_MAX_LENGTH } from './constants';
interface VALID_RETURN {
	status: boolean;
	message: string;
}

export const validatePassword = (passport: string): VALID_RETURN => {
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

export const checkPassword = (rule: any, value: string, callback: any) => {
	const result = validatePassword(value);
	if (result.status) {
		callback();
	} else {
		callback(new Error(result.message));
	}
};
export const handleLogin = (account: string, passport: string) => {
	// 发送请求
	const result = {
		status: 0,
		message: '登录成功',
	};
	const status = result.status;
	if (status === LOGIN_STATUS.FAILURE) {
		console.log('登录失败', result.message);
	}
};

export const PASSPORT_REG = /^(?=.*\d)(?=.*[^\da-zA-Z\s])(\d|[^\da-zA-Z\s]){1,16}$/;
export const PASSPORT_MAX_LENGTH = 16;

export enum LOGIN_STATUS {
	SUCCESS = 0,
	FAILURE = 1,
}

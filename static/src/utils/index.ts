import moment from 'moment';

export const formatDate = (date: number | string): string => {
	if (isNaN(+date)) {
		return 'unknown date';
	}
	return moment(+date * 1000).format('YYYY-MM-DD HH:mm:ss');
};

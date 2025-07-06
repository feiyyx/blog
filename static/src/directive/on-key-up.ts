import type { DirectiveProps, ElType } from './types';
const operation = 'keyup';
export const onKeyUp: DirectiveProps<'vKeyUp'> = {
	name: 'keyUp',
	directive: {
		mounted: (el: ElType, { value }, vnode) => {
			const { fn } = value;
			el.$fn = (event: KeyboardEvent) => {
				if (event.key === 'Enter' || event.code === 'Enter') {
					// TODO 防抖
					fn();
				}
			};
			document.addEventListener(operation, el.$fn);
		},
		beforeUnmount: (el: ElType) => {
			document.removeEventListener(operation, el.$fn);
		},
	},
};

export default onKeyUp;

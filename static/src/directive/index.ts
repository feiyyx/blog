import type { App } from 'vue';
import type { DirectiveProps, DirectiveType } from './types';

export default async function registerDirectives(app: App) {
	const files: any = import.meta.glob('./*.ts', { eager: true });
	const EXCLUDES_FILES = ['./index.ts', './types.ts'];
	for (const key in files) {
		if (EXCLUDES_FILES.includes(key)) {
			continue;
		}
		const file = files[key];
		if (file) {
			const directive = file.default as DirectiveProps<DirectiveType>;
			app.directive(directive.name, directive.directive);
		}
	}
}

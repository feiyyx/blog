import type { App } from 'vue';
import onKeyDown from './on-key-down';
import onKeyUp from './on-key-up';
import type { DirectiveProps, DirectiveType } from './types';

export default async function registerDirectives(app: App) {
    const FILES = [onKeyDown, onKeyUp];
    for (const key in FILES) {
        const file = FILES[key];
        if (file) {
            const directive = file as DirectiveProps<DirectiveType>;
            app.directive(directive.name, directive.directive);
        }
    }
}

import type { Directive } from 'vue';
export interface ElType extends KeyboardEvent {
	$fn: (event: KeyboardEvent) => void;
}
export interface Directives {
	vKeyUp: Directive<any, { fn: (...args: any[]) => void }>;
	vKeyDown: Directive<any, { fn: (...args: any[]) => void }>;
}

export type DirectiveType = keyof Directives;
type UpperLetter =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z';

export type LowercaseDirectiveName<T extends DirectiveType> =
	T extends `v${UpperLetter}${infer Rest}` ? `${Lowercase<UpperLetter>}${Rest}` : never;

export interface DirectiveProps<T extends DirectiveType> {
	name: LowercaseDirectiveName<T>;
	directive: Directives[T];
}

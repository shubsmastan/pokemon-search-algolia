export interface AppState {
	pokemon: Pokemon[];
	language: LanguageOptions;
	team: string[];
	showOnlyTeam: boolean;
}

export enum LanguageOptions {
	EN = 'english',
	FR = 'french',
	JA = 'japanese',
	ZH = 'chinese',
}

export interface Pokemon {
	objectID: string;
	name: {
		english: string;
		japanese: string;
		chinese: string;
		french: string;
	};
	id: number;
	type: string[];
	base: {
		HP: number;
		Attack: number;
		Defense: number;
		'Sp. Attack': number;
		'Sp. Defense': number;
		Speed: number;
	};
	image: string;
	game_versions?: string[];
	imageUrl?: string;
}

import { Store } from '@tanstack/store';

import { LanguageOptions, AppState } from '../../types';

export const store = new Store<AppState>({
	pokemon: [],
	language: LanguageOptions.EN,
	team: [],
	showOnlyTeam: false,
});

export const updateLanguage = (language: LanguageOptions) => {
	store.setState(state => {
		return {
			...state,
			language,
		};
	});
};

export const updateTeam = (team: string[]) => {
	store.setState(state => {
		return {
			...state,
			team,
		};
	});
};

export const updateShowOnlyTeam = (showOnlyTeam: boolean) => {
	store.setState(state => {
		return {
			...state,
			showOnlyTeam,
		};
	});
};

import { Store } from '@tanstack/store';

import { Pokemon, LanguageOptions, AppState } from '../../types';

export const store = new Store<AppState>({
	pokemon: [],
	language: LanguageOptions.EN,
	team: [],
	search: '',
});

export const updatePokemon = (pokemon: Pokemon[]) => {
	store.setState(state => {
		return {
			...state,
			pokemon,
		};
	});
};

export const updateLanguage = (language: LanguageOptions) => {
	store.setState(state => {
		return {
			...state,
			language,
		};
	});
};

export const updateTeam = (team: Pokemon[]) => {
	store.setState(state => {
		return {
			...state,
			team,
		};
	});
};

export const updateSearch = (search: string) => {
	store.setState(state => {
		return {
			...state,
			search,
		};
	});
};

import { Store } from '@tanstack/store';

import { Pokemon, LanguageOptions, AppState } from '../../types';

export const store = new Store<AppState>({
	pokemon: [],
	language: LanguageOptions.EN,
	team: [],
	search: '',
	favourites: [],
});

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

export const updateFavourites = (favourites: string[]) => {
	localStorage.setItem('favourites', JSON.stringify(favourites));
	store.setState(state => {
		return {
			...state,
			favourites,
		};
	});
};

export const updateTeamFilter = (teamFilter: boolean) => {
	store.setState(state => {
		return {
			...state,
			teamFilter,
		};
	});
};

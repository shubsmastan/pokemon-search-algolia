import { Store } from '@tanstack/store';
import { Pokemon, LanguageOptions } from '../../types';

export const store = new Store<{
	pokemon: Pokemon[];
	language: LanguageOptions;
	team: Pokemon[];
}>({
	pokemon: [],
	language: LanguageOptions.en,
	team: [],
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

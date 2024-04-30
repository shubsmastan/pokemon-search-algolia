import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import algoliasearch from 'algoliasearch';

import { updateLanguage } from '../store';
import { LanguageOptions, Pokemon } from '../../types';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
const index = searchClient.initIndex('pokemon_data');

export const useGetPokemon = (searchTerm = '') => {
	const [data, setData] = useState<Pokemon[]>();
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>();

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			await index.browseObjects({
				query: searchTerm,
				batch: batch => {
					setData(batch as Pokemon[]);
				},
			});
		} catch (err) {
			console.log(err);
			setError(
				'Could not fetch Pokemon - please check console for error.'
			);
		} finally {
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		getData();
	}, [getData]);

	return { data, loading, error };
};

export const useUpdatePokemon = (pokemon: Pokemon[]) => {
	const updateData = useCallback(async () => {
		if (pokemon.length === 0) return;

		const pokemonVersionData: {
			objectID: string;
			game_versions: string[];
		}[] = [];

		try {
			for (const monster of pokemon) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const data: any = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${monster.id}`
				);
				const { id, game_indices } = data;

				const objectID: string = pokemon.find(
					mon => mon.id === id
				)!.objectID;

				const game_versions = game_indices.map(
					({ version }: { version: { name: string } }) => {
						const versionName =
							version.name[0].toUpperCase() +
							version.name.slice(1);
						return versionName;
					}
				);

				pokemonVersionData.push({
					objectID,
					game_versions,
				});
			}
			await index.partialUpdateObjects(pokemonVersionData);
		} catch (err) {
			console.log(err);
		}
	}, [pokemon]);

	useEffect(() => {
		updateData();
	}, [updateData]);
};

export const useLanguage = () => {
	const languagePreference = localStorage.getItem('language') || 'english';

	const languages: string[] = Object.values(LanguageOptions);

	useEffect(() => {
		if (languages.includes(languagePreference)) {
			updateLanguage(languagePreference as LanguageOptions);
		} else {
			console.log(
				'No valid language in local storage - resetting to English.'
			);
			updateLanguage(LanguageOptions.EN);
		}
	}, [languagePreference, languages]);

	return languagePreference;
};

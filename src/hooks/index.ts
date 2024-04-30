import algoliasearch from 'algoliasearch';
import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../../types';
import axios from 'axios';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
const index = searchClient.initIndex('pokemon_data');

export const useGetPokemon = () => {
	const [data, setData] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			await index.browseObjects({
				query: '',
				batch: batch => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					setData(batch as any);
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
	}, []);

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

		for (const monster of pokemon) {
			try {
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
			} catch (err) {
				console.log(err);
			}
		}

		await index.partialUpdateObjects(pokemonVersionData);
	}, [pokemon]);

	useEffect(() => {
		updateData();
	}, [updateData]);
};

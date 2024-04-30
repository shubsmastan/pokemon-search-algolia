import algoliasearch from 'algoliasearch';
import { useCallback, useEffect } from 'react';
import { useStore } from '@tanstack/react-store';

import { store, updatePokemon } from '../store';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
const index = searchClient.initIndex('pokemon_data');

export const SearchResults = () => {
	const searchTerm = useStore(store, store => store.search);
	const pokemon = useStore(store, store => store.pokemon);

	const findPokemon = useCallback(async () => {
		await index.browseObjects({
			query: searchTerm,
			batch: batch => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				updatePokemon(batch as any);
			},
		});
	}, [searchTerm]);

	useEffect(() => {
		findPokemon();
	}, [findPokemon]);

	if (!searchTerm) {
		return (
			<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl flex gap-5 h-full w-5/6'>
				<p>Type a search term to see some Pokémon!</p>
			</div>
		);
	}

	return (
		<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl flex gap-5 h-full w-5/6'>
			{pokemon.map(monster => {
				return <p>{monster.name.english}</p>;
			})}
		</div>
	);
};

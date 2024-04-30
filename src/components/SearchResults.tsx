import algoliasearch from 'algoliasearch';
import { useCallback, useEffect } from 'react';
import { useStore } from '@tanstack/react-store';

import { PokemonCard } from './PokemonCard';
import { store, updatePokemon } from '../store';
import { Pokemon } from '../../types';

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
				updatePokemon(batch as Pokemon[]);
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
		<div className='grid grid-cols-1 gap-x-10 gap-y-5 overflow-y-auto bg-slate-300 dark:bg-slate-700 p-5 rounded-xl h-full w-5/6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{pokemon.map(monster => {
				return <PokemonCard monster={monster} key={monster.objectID} />;
			})}
		</div>
	);
};

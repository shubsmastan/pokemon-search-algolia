import { useEffect } from 'react';
import { useStore } from '@tanstack/react-store';

import { PokemonCard } from './PokemonCard';
import { store } from '../store';
import { useGetPokemon } from '../hooks';
import { Loading } from './Loading';

export const SearchResults = () => {
	const searchTerm = useStore(store, store => store.search);

	const { data, loading, error } = useGetPokemon(searchTerm);

	useEffect(() => {}, []);

	if (!searchTerm) {
		return (
			<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl flex gap-5 h-full w-5/6'>
				<p>Type a search term to see some Pokémon!</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl h-full md:w-5/6'>
				<Loading />
			</div>
		);
	} else if (error) {
		return (
			<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl h-full md:w-5/6'>
				<p>
					🥺 Something went wrong. Please try reloading the app or
					trying again later.
				</p>
			</div>
		);
	} else if (!data) {
		return (
			<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl h-full md:w-5/6'>
				<p>🥺 No Pokémon found. Please try another search term.</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-x-10 gap-y-5 overflow-y-auto bg-slate-300 dark:bg-slate-700 p-5 rounded-xl h-full md:w-5/6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
			{data.length > 0 &&
				data.map(monster => {
					return (
						<PokemonCard monster={monster} key={monster.objectID} />
					);
				})}
		</div>
	);
};

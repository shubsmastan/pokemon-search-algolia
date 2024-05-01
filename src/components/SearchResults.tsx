import { Pagination, useHits } from 'react-instantsearch';
import { useStore } from '@tanstack/react-store';

import { PokemonCard } from './PokemonCard';
import { store } from '../store';
import { Pokemon } from '../../types';

export const SearchResults = () => {
	const { hits } = useHits();
	const favourites = useStore(store, store => store.favourites) || [];
	const teamFilter = useStore(store, store => store.teamFilter);

	if (hits.length === 0) {
		return (
			<div className='flex flex-col gap-3 lg:h-full w-full rounded-xl lg:overflow-y-auto p-5 bg-slate-200 dark:bg-slate-700'>
				<p>🥺 No Pokémon found. Please try another search term.</p>
			</div>
		);
	}

	let results = [];

	if (teamFilter) {
		results = hits.filter(hit => favourites.includes(hit.objectID));
	} else results = hits;

	return (
		<div className='relative flex flex-col gap-3 lg:h-full w-full rounded-xl lg:overflow-y-auto p-5 bg-slate-200 dark:bg-slate-700'>
			<h2 className='absolute text-sm top-3 left-5 lg:left-auto lg:right-8'>
				{hits.length} results
			</h2>
			<Pagination
				classNames={{
					list: 'flex gap-3 justify-center items-center text-3xl text-blue-600 dark:text-blue-400 sm:gap-5',
					pageItem: 'text-lg mt-2',
					selectedItem: 'text-black dark:text-white',
					disabledItem: 'text-black dark:text-white',
				}}
			/>
			<div className='grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
				{results.map(hit => {
					return (
						<PokemonCard
							key={hit.objectID}
							hit={hit as unknown as Pokemon}
						/>
					);
				})}
			</div>
		</div>
	);
};

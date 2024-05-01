import { Hits, Pagination, useHits } from 'react-instantsearch';

import { PokemonCard } from './PokemonCard';

export const SearchResults = () => {
	const { hits } = useHits();

	if (hits.length === 0) {
		return (
			<div className='flex flex-col gap-3 overflow-y-auto p-5 bg-slate-300 dark:bg-slate-700 rounded-xl h-full w-full'>
				<p>🥺 No Pokémon found. Please try another search term.</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-3 overflow-y-auto p-5 pt-0 bg-slate-300 dark:bg-slate-700 rounded-xl h-full w-full'>
			<Pagination
				classNames={{
					list: 'flex gap-5 justify-center items-center text-3xl text-blue-700 dark:text-blue-300',
					pageItem: 'text-lg mt-2',
					selectedItem: 'text-white',
					disabledItem: 'text-white',
				}}
			/>
			<Hits
				hitComponent={PokemonCard}
				classNames={{
					root: '',
					list: 'grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
				}}
			/>
		</div>
	);
};

import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { Hits, Pagination, useHits, useConfigure } from 'react-instantsearch';

import { store, updateTeam } from '../store';
import { useTeam } from '../hooks';
import { PokemonCard } from './PokemonCard';

export const SearchResults = () => {
	const { results } = useHits();

	const team = useTeam();

	useEffect(() => {
		updateTeam(team);
	}, [team]);

	const showOnlyTeam = useStore(store, store => store.showOnlyTeam);

	const [filters, setFilters] = useState('');

	useEffect(() => {
		if (showOnlyTeam) {
			let filterString = '';
			team.forEach((member: string, index: number) => {
				if (index === team.length - 1) filterString += 'id=' + member;
				else filterString += 'id=' + member + ' OR ';
			});
			setFilters(filterString);
		} else setFilters('');
	}, [team, showOnlyTeam]);

	useConfigure({
		filters,
	});

	if (results?.nbHits === 0) {
		return (
			<div className='flex flex-col gap-3 lg:h-full w-full rounded-xl lg:overflow-y-auto p-5 bg-slate-200 dark:bg-slate-700'>
				<p>🥺 No Pokémon found. Please try another search term.</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-3 lg:h-full w-full rounded-xl lg:overflow-y-auto p-5 bg-slate-200 dark:bg-slate-700'>
			<h2 className='text-sm top-3 left-5 lg:left-auto lg:right-8'>
				{results?.nbHits} results
			</h2>
			<Hits
				hitComponent={PokemonCard}
				classNames={{
					list: 'grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5',
				}}
			/>
			<Pagination
				classNames={{
					list: 'flex gap-3 justify-center items-center text-3xl text-blue-600 dark:text-blue-400 sm:gap-5',
					pageItem: 'text-lg mt-2',
					selectedItem: 'text-black dark:text-white',
					disabledItem: 'text-black dark:text-white',
				}}
			/>
		</div>
	);
};

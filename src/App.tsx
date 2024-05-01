import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch';

import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { FiltersBar } from './components/FiltersBar';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);

export const App = () => {
	/*
	This code is commented out as the data update from the Pokemon API takes a while.
	All the necessary updates were performed once but presumably in a proper app you'd need to update regularly!
	
	const { data = [] } = useGetPokemon();

	useUpdatePokemon(data);
	*/

	return (
		<InstantSearch searchClient={searchClient} indexName='pokemon_data'>
			<div className='min-h-screen p-5 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100'>
				<SearchBar />
				<div className='mt-5 flex flex-col gap-5 lg:h-[calc(100vh-8.75rem)] lg:flex-row'>
					<FiltersBar />
					<SearchResults />
				</div>
			</div>
		</InstantSearch>
	);
};

import { useEffect } from 'react';

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch';

import { useGetPokemon } from './hooks';
import { updatePokemon } from './store';

import { SearchBar } from './components/SearchBar';
import { FiltersBar } from './components/FiltersBar';
import { SearchResults } from './components/SearchResults';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
// const index = searchClient.initIndex('pokemon_data');

const App = () => {
	// const pokemon = useStore(store, store => store.pokemon);

	const { data, loading, error } = useGetPokemon();

	useEffect(() => {
		updatePokemon(data);
	}, [data]);

	// Commented this out to avoid too many calls to the API - takes a long time!
	// useUpdatePokemon(pokemon);

	if (error) {
		return (
			<div>
				<p>{error}</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<InstantSearch searchClient={searchClient} indexName='pokemon_data'>
			<div className='min-h-screen p-5 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100'>
				<SearchBar />
				<div className='mt-5 flex gap-5 h-[calc(100vh-8.75rem)]'>
					<FiltersBar />
					<SearchResults />
				</div>
			</div>
		</InstantSearch>
	);
};

export default App;

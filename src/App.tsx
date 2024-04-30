import algoliasearch from 'algoliasearch';
import { useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch';
import { useGetPokemon } from './hooks';
import { useStore } from '@tanstack/react-store';
import { store, updatePokemon } from './store';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
// const index = searchClient.initIndex('pokemon_data');

const App = () => {
	const pokemon = useStore(store, store => store.pokemon);

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
		<>
			<InstantSearch searchClient={searchClient} indexName='pokemon_data'>
				<p>{pokemon.length} Pokemon available to search!</p>
			</InstantSearch>
		</>
	);
};

export default App;

import algoliasearch from 'algoliasearch';
import { useCallback, useEffect, useState } from 'react';
import { InstantSearch } from 'react-instantsearch';

const searchClient = algoliasearch(
	'2G7B85UVZH',
	'b9a4732423730854c5c3911d150291a4'
);
const index = searchClient.initIndex('pokemon_data');

const App = () => {
	const [pokemon, setPokemon] = useState([]);

	const getData = useCallback(async () => {
		await index.browseObjects({
			query: '',
			batch: batch => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setPokemon(batch as any);
			},
		});
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<>
			<InstantSearch searchClient={searchClient} indexName='pokemon_data'>
				<div className='flex flex-col justify-center items-center h-screen'>
					<div className='flex flex-col gap-2'>
						<h1 className='text-2xl font-bold text-center mb-8'>
							👋 Welcome to this assignement
						</h1>
						<ul>
							<li>This boilerplate is providing:</li>
							<li>- React</li>
							<li>- Tailwind</li>
							<li>- Typescript</li>
							<li>- React Instant Search from Algolia</li>
						</ul>
						<p>
							Feel free to use it or build something from scratch
						</p>
						<p>
							Every information you need should be found in the
							<a
								target='_blank'
								href='https://github.com/algolia/Demo-engineers-assignement'
								className='text-indigo-800'>
								readMe
							</a>
						</p>
						<p>
							There is no time limit but you should aim around 4
							hours to complete it
						</p>
						<p>Happy coding 🥷</p>
						{pokemon.length > 1 && (
							<p>
								The Pokemon have been retrieved!{' '}
								{pokemon.length} Pokemon available to search.
							</p>
						)}
					</div>
				</div>
			</InstantSearch>
		</>
	);
};

export default App;

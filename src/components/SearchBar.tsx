import { useStore } from '@tanstack/react-store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { store, updateLanguage, updateSearch } from '../store';
import pokemonLogo from '/pokemon-logo.svg';
import { LanguageOptions } from '../../types';
import { useLanguage } from '../hooks';

export const SearchBar = () => {
	const language = useLanguage();
	const searchTerm = useStore(store, store => store.search);

	return (
		<div className='flex flex-col items-center gap-5 p-5 rounded-xl h-40 bg-slate-300 dark:bg-slate-700 md:h-20 md:flex-row'>
			<div className='flex items-center gap-5 w-full md:w-auto'>
				<div className='flex flex-col justify-center w-44'>
					<img src={pokemonLogo} className='h-10 pb-1 md:h-12' />
					<p className='text-xs text-center'>
						Powered by&nbsp;
						<a
							href='https://www.algolia.com/'
							target='_blank'
							className='text-blue-700 dark:text-blue-300 focus:rounded-sm focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-blue-700 dark:focus:outline-blue-300'>
							Algolia
						</a>
					</p>
				</div>
				<select
					name='language'
					id='language'
					defaultValue={language}
					className='w-60 rounded-md p-2 text-slate-900 focus:outline focus:outline-[3px] focus:outline-offset-4 focus:outline-blue-700 dark:focus:outline-blue-300'
					onChange={e => {
						updateLanguage(e.target.value as LanguageOptions);
						localStorage.setItem('language', e.target.value);
					}}>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='japanese'>Japanese</option>
					<option value='chinese'>Chinese</option>
				</select>
			</div>
			<div className='flex px-3 py-1 gap-3 items-center bg-white w-full rounded-md focus-within:outline focus-within:outline-offset-4 focus-within:outline-[3px] focus-within:outline-blue-700 dark:focus-within:outline-blue-300'>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					style={{ color: '#0f172a' }}
				/>
				<input
					type='text'
					placeholder='Search'
					className='w-full focus:outline-none text-slate-900'
					value={searchTerm}
					onChange={e => {
						updateSearch(e.target.value);
					}}></input>
			</div>
		</div>
	);
};

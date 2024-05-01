import { SearchBox } from 'react-instantsearch';

import { useLanguage } from '../hooks';
import { updateLanguage } from '../store';
import { LanguageOptions } from '../../types';

import pokemonLogo from '/pokemon-logo.svg';
import algoliaLogo from '/algolia-logo.svg';

export const SearchBar = () => {
	const language = useLanguage();

	const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		updateLanguage(e.target.value as LanguageOptions);
		localStorage.setItem('language', e.target.value);
	};

	return (
		<div className='flex flex-col items-center gap-5 p-5 rounded-xl h-40 bg-slate-300 dark:bg-slate-700 md:h-20 md:flex-row'>
			<div className='flex items-center gap-5 w-full md:w-auto'>
				<div className='flex flex-col justify-center w-44'>
					<img src={pokemonLogo} className='pb-1 h-12' />
				</div>
				<select
					name='language'
					id='language'
					defaultValue={language}
					className='w-48 rounded-md p-2 text-slate-900 focus:outline focus:outline-[3px] focus:outline-offset-4 focus:outline-blue-700 dark:focus:outline-blue-300 sm:w-60'
					onChange={onLanguageChange}>
					<option value='english'>English</option>
					<option value='french'>Français</option>
					<option value='japanese'>日本語</option>
					<option value='chinese'>中文</option>
				</select>
			</div>
			<div className='flex p-1 rounded-md w-full bg-white'>
				<SearchBox
					placeholder='Search'
					classNames={{
						root: 'flex-1 relative',
						input: 'w-[calc(100%-20px)] h-8 pl-10 pr-3 rounded-md text-slate-900 focus:outline-none',
						submitIcon: 'h-6 w-6 absolute top-1 left-2 bottom-0',
						resetIcon: 'h-4 w-4 absolute top-2 right-3 bottom-0',
					}}
				/>
				<div className='flex items-center justify-center bg-white p-1 rounded-md'>
					<p className='text-xs text-slate-900'>Search by&nbsp;</p>
					<img src={algoliaLogo} className='h-5' />
				</div>
			</div>
		</div>
	);
};

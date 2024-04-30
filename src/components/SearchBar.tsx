import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import pokemonLogo from '/pokemon-logo.svg';

export const SearchBar = () => {
	return (
		<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl flex gap-5 h-20'>
			<div className='flex flex-col justify-center w-44'>
				<img src={pokemonLogo} style={{ height: 40 }} />
				<p className='text-xs text-center'>
					Powered by{' '}
					<a
						href='https://www.algolia.com/'
						className='text-blue-700 dark:text-blue-300'>
						Algolia
					</a>
				</p>
			</div>
			<div className='bg-white w-full flex p-3 gap-3 rounded-md focus-within:outline focus-within:outline-offset-4  focus-within:outline-blue-700 dark:focus-within:outline-blue-300'>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					style={{ color: '#0f172a' }}
				/>
				<input
					type='text'
					placeholder='Search'
					className='w-full focus:outline-none text-slate-900'></input>
			</div>
		</div>
	);
};

import { useState } from 'react';
import { RefinementList } from 'react-instantsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const FiltersBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='flex flex-col gap-5 p-5 rounded-xl bg-slate-300 dark:bg-slate-700 sm:h-full sm:w-1/6'>
			<div className='flex items-center gap-2 sm:hidden'>
				<button
					className={`${isOpen && 'rotate-180'} rounded-md focus:outline focus:outline-2 focus:outline-blue-700 dark:focus:outline-blue-300 h-6 w-6`}
					onClick={() => {
						setIsOpen(prev => !prev);
					}}>
					<FontAwesomeIcon icon={faChevronDown} />
				</button>
				<p className='font-bold'>Toggle Filters</p>
			</div>
			<p>Types</p>
			<RefinementList attribute='type' />
		</div>
	);
};

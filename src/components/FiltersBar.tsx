import { useState } from 'react';
import { RefinementList, RangeInput, usePagination } from 'react-instantsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '@tanstack/react-store';

import { store, updateShowOnlyTeam } from '../store';

export const FiltersBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [sliderValue, setSliderValue] = useState('100');

	const showOnlyTeam = useStore(store, store => store.showOnlyTeam);

	const { refine } = usePagination();

	return (
		<div className='flex flex-col gap-5 p-5 rounded-xl bg-slate-200 dark:bg-slate-700 lg:h-full lg:w-3/12 lg:overflow-y-scroll'>
			<div className='flex items-center gap-2 lg:hidden'>
				<button
					className={`${isOpen && 'rotate-180'} rounded-md focus:outline focus:outline-2 focus:outline-blue-700 dark:focus:outline-blue-300 h-6 w-6`}
					onClick={() => {
						setIsOpen(prev => !prev);
					}}>
					<FontAwesomeIcon icon={faChevronDown} />
				</button>
				<p className='font-bold'>{isOpen ? 'Hide' : 'Show'} Filters</p>
			</div>
			<div className={`${!isOpen && 'hidden'} lg:block`}>
				<div className='mb-5 font-bold'>
					<input
						type='checkbox'
						id='team'
						name='team'
						value='Team'
						onChange={e => {
							updateShowOnlyTeam(e.target.checked);
							refine(0);
						}}
						defaultChecked={showOnlyTeam}
					/>
					<label htmlFor='team'>My team only</label>
				</div>
				<div className='sm:flex gap-20 lg:block'>
					<div>
						<h4 className='font-bold'>Filter by Type</h4>
						<RefinementList
							attribute='type'
							classNames={{
								root: 'text-sm mt-2 mb-5',
								list: 'flex flex-col gap-1',
								count: 'before:content-["("] after:content-[")"]',
								checkbox: 'mr-1',
							}}
						/>
					</div>
					<div>
						<h4 className='font-bold'>Filter by Version</h4>
						<RefinementList
							attribute='game_versions'
							classNames={{
								root: 'text-sm mt-2 mb-5',
								list: 'flex flex-col gap-1',
								count: 'before:content-["("] after:content-[")"]',
								checkbox: 'mr-1',
							}}
						/>
					</div>
				</div>
				<h4 className='font-bold'>Filter by HP</h4>
				<div className='flex gap-3 lg:flex-col lg:gap-0 xl:flex-row xl:gap-3'>
					<input
						type='range'
						min='1'
						max='100'
						value={sliderValue}
						onChange={e => {
							setSliderValue(e.target.value);
						}}
						id='hpRange'></input>
					<p className=''>{sliderValue}</p>
				</div>
				<RangeInput
					min={1}
					max={parseInt(sliderValue)}
					attribute='base.HP'
					classNames={{
						root: 'hidden',
						inputMin: 'text-slate-900',
						inputMax: 'text-slate-900',
					}}
				/>
			</div>
		</div>
	);
};

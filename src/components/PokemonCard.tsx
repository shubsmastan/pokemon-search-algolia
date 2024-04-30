import { useStore } from '@tanstack/react-store';

import { store } from '../store';
import { Pokemon } from '../../types';

interface PokemonCardProps {
	monster: Pokemon;
}

export const PokemonCard = ({ monster }: PokemonCardProps) => {
	const language = useStore(store, store => store.language);

	return (
		<div className='flex flex-col gap-5 items-center justify-evenly p-3 h-80 rounded-md shadow-sm border-[1px] border-slate-500 shadow-slate-500'>
			<img src={monster.image} style={{ height: 150, width: 150 }} />
			<h3 className='font-medium'>{monster.name[language]}</h3>
		</div>
	);
};
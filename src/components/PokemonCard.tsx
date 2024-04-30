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
			<img src={monster.image} style={{ height: 100 }} />
			<div className='flex flex-col gap-2 w-full items-center'>
				<h3 className='font-medium'>{monster.name[language]}</h3>
				<p>
					Types:
					{monster.type.map(t => (
						<p>{t}</p>
					))}
				</p>
			</div>
		</div>
	);
};

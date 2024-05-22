import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

import { store, updateTeam } from '../store';

interface PokemonCardProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	hit: any;
}

export const PokemonCard = ({ hit }: PokemonCardProps) => {
	const language = useStore(store, store => store.language);
	const team = useStore(store, store => store.team);

	const [isInTeam, setIsInTeam] = useState(false);

	const { name, id, image, type, base } = hit;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const typeString = type.map((t: any, i: number) => {
		if (i === type.length - 1) {
			return t;
		}
		return t + ', ';
	});

	const toggleTeamMember = () => {
		setIsInTeam(prev => !prev);
		if (team.includes(id)) {
			const filteredTeam = team.filter((member: string) => member !== id);
			updateTeam(filteredTeam);
			localStorage.setItem('team', JSON.stringify(filteredTeam));
		} else {
			updateTeam([...team, id]);
			localStorage.setItem('team', JSON.stringify([...team, id]));
		}
	};

	useEffect(() => {
		if (team.includes(id)) setIsInTeam(true);
	}, [team, id]);

	return (
		<div className='flex flex-col gap-5 items-center justify-evenly p-3 pb-5 h-full rounded-md shadow-sm border-[1px] border-slate-500 shadow-slate-500'>
			<img src={image} className='h-24' />
			<div className='flex flex-col gap-2 w-full items-center text-sm'>
				<h3 className='font-medium text-lg pb-3'>
					{name[language]}&nbsp;
					<span className='font-light text-sm'>({typeString})</span>
				</h3>
				<div className='grid grid-cols-2 gap-x-2 gap-y-5'>
					<p>HP: {base.HP}</p>
					<p>Speed: {base.Speed}</p>
					<p>Attack: {base.Attack}</p>
					<p>Sp. Attack: {base['Sp. Attack']}</p>
					<p>Defense: {base.Defense}</p>
					<p>Sp. Defense: {base['Sp. Defense']}</p>
				</div>
			</div>
			<button
				className='flex items-center justify-center gap-2 border-2 border-slate-900 dark:border-slate-100 rounded-md px-3 py-1'
				onClick={toggleTeamMember}>
				{isInTeam && (
					<FontAwesomeIcon
						className='cursor-pointer'
						icon={faHeart}
					/>
				)}
				{!isInTeam && (
					<FontAwesomeIcon
						className='cursor-pointer'
						icon={faHeartEmpty}
					/>
				)}
				{isInTeam ? 'Remove from ' : 'Add to '} team
			</button>
		</div>
	);
};

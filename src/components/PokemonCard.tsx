import { useStore } from '@tanstack/react-store';

import { store, updateFavourites } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { useFavourites } from '../hooks';
import { Pokemon } from '../../types';

interface PokemonCardProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	hit: Pokemon;
}

export const PokemonCard = ({ hit }: PokemonCardProps) => {
	const language = useStore(store, store => store.language);
	const favourites = useStore(store, store => store.favourites) || [];

	useFavourites();

	const { name, image, type, base, objectID } = hit;
	const liked = favourites.includes(objectID);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const typeString = type.map((t: any, i: number) => {
		if (i === type.length - 1) {
			return t;
		}
		return t + ', ';
	});

	const onAddToTeam = () => {
		if (liked)
			updateFavourites(favourites.filter(item => item !== objectID));
		else {
			updateFavourites([...favourites, objectID]);
		}
	};

	return (
		<div className='flex flex-col gap-5 items-center justify-around p-3 h-full rounded-md shadow-sm border-[1px] border-slate-500 shadow-slate-500'>
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
				<div className='flex gap-2 mt-3'>
					<p>Add to team</p>
					<button onClick={onAddToTeam}>
						{liked ? (
							<FontAwesomeIcon icon={faStar} />
						) : (
							<FontAwesomeIcon icon={faStarEmpty} />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

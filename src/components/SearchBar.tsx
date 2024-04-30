export const SearchBar = () => {
	return (
		<div className='bg-slate-300 dark:bg-slate-700 p-5 rounded-xl flex gap-5 h-20'>
			<p className='w-32'>Search Bar</p>
			<input type='text' placeholder='search' className='w-full'></input>
		</div>
	);
};

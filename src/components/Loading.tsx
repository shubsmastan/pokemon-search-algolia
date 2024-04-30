import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Loading = () => {
	return (
		<div
			style={{
				fontSize: '2rem',
				textAlign: 'center',
				padding: '40px 0',
			}}>
			<FontAwesomeIcon
				icon={faSpinner}
				style={{ marginRight: '10px' }}
				size='lg'
				spin
			/>
		</div>
	);
};

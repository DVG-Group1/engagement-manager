import icon from 'material-ui/svg-icons/action/list';
import component from './container';
import reducer from './reducer';

export default {
	label: 'View Data',
	path: 'view-data',
	icon,
	component,
	reducer,
	loader: {resource: 'allData', actionType: 'LOAD_ALL_DATA'}
};

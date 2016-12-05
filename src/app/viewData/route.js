import icon from 'material-ui/svg-icons/action/list';
import component from './container';
import reducer from './reducer';

export default {
	label: 'Manage Data',
	path: '/data/:table',
	icon,
	component,
	reducer,
	loader: {resource: 'allData', actionType: 'LOAD_ALL_DATA'},
	subItems: [{
		label: 'People',
		path: '/data/people'
	}, {
		label: 'Risk Dimensions',
		path: '/data/risk_dimensions'
	}, {
		label: 'Risk Options',
		path: '/data/risk_dimension_options'
	}]
};

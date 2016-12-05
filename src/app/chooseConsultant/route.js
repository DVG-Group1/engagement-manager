import icon from 'material-ui/svg-icons/action/assignment';
import component from './container';
import reducer from './reducer';

export default {
	label: 'Risk Assessments',
	path: '/risk-assessments',
	icon,
	component,
	reducer,
	// getSubItems: state => (state.data.people || []).filter(p => p.manager_id === state.userID).map(p => {
	// 	return {
	// 		label: p.first_name + ' ' + p.last_name,
	// 		path: '/risk-assessments/' + p.id
	// 	};
	// })
};

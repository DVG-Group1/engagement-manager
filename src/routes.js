import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ListIcon from 'material-ui/svg-icons/action/list';
import HomeIcon from 'material-ui/svg-icons/action/home';

import ConsultantChooser from './components/consultantChooser';
import RiskAssessment from './components/riskAssessment';
import ViewData from './components/viewData';
import Home from './components/home';

var routes = [{
	label: 'Home',
	path: '',
	icon: HomeIcon,
	component: Home
}, {
	label: 'Choose a Consultant',
	drawerLabel: 'Risk Assessments',
	path: 'choose-consultant',
	icon: AssignmentIcon,
	component: ConsultantChooser
}, {
	label: 'View Data',
	path: 'view-data',
	icon: ListIcon,
	component: ViewData
}, {
	label: 'Risk Assessment',
	regex: /^new-risk-assessment\/(\d+)$/,
	params: ['assessee'],
	component: RiskAssessment
}];

export default routes;

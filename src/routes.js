import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ListIcon from 'material-ui/svg-icons/action/list';
import HomeIcon from 'material-ui/svg-icons/action/home';

import App from './components/app';
import ConsultantChooser from './components/consultantChooser';
import RiskAssessment from './components/riskAssessment';
import ViewData from './components/viewData';
import Home from './components/home';

import request from './dataService';

export default (store) => {

	var load = (resource, actionType) => {
		store.dispatch({type: 'LOADING'});
		request(resource).then(data => {
			store.dispatch({type: actionType, data});
			store.dispatch({type: 'LOADED'});
		}).catch(error => {
			console.error(error);
			store.dispatch({type: 'SET_ERROR', error});
		});
	};

	return {
		path: '/',
		component: App,
		indexRoute: {component: Home},
		onEnter: () => load('init/' + store.getState().userID, 'RECEIVED_DATA'),
		childRoutes: [{
			label: 'Home',
			path: 'home',
			icon: HomeIcon,
			component: Home
		}, {
			label: 'Choose a Consultant',
			drawerLabel: 'Risk Assessments',
			path: 'choose-consultant',
			icon: AssignmentIcon,
			component: ConsultantChooser
		}, {
			label: 'Risk Assessment',
			path: 'new-risk-assessment/:assessee',
			component: RiskAssessment
		}, {
			label: 'View Data',
			path: 'view-data',
			icon: ListIcon,
			component: ViewData,
			onEnter: () => load('allData', 'LOAD_ALL_DATA')
		}]
	};
};

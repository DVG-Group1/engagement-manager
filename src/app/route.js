import app from './container';
import home from './home/route';
import chooseConsultant from './chooseConsultant/route';
import riskAssessment from './riskAssessment/route';
import viewData from './viewData/route';

export default {
	path: '/',
	component: app,
	indexRoute: {component: home.component},
	loader: {resource: 'init', actionType: 'RECEIVED_DATA'},
	childRoutes: [
		home,
		chooseConsultant,
		riskAssessment,
		viewData
	]
};

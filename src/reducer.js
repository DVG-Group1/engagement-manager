// import { combineReducers } from 'redux';
import routes from './routes';

export const reducer = (state = {
	drawerOpen: false,
	userID: 84,
	routes,
	route: routes[0],
	loading: true,
	riskAssessmentAnswers: {},
	riskAssessmentNote: '',
	people: [],
	riskDimensions: []
}, action) => {
	switch (action.type){
	case 'LOADING': return {...state, loading: true};
	case 'RECEIVED_DATA': return {...state, ...action.data, loading: false};

	case 'SET_ERROR':
		window.scrollTo(0, 0);
		console.error(action.error);
		return {...state, error: action.error, loading: false};

	case 'CLOSE_DRAWER': return {...state, drawerOpen: false};
	case 'OPEN_DRAWER': return {...state, drawerOpen: true};

	case 'SET_USER_ID': return {...state, userID: action.userID};
	case 'SET_ROUTE': return {
		...state,
		route: action.route,
		routeParams: action.routeParams
	};

	case 'SET_RISK_OPTION': return {
		...state,
		riskAssessmentAnswers: {
			...state.riskAssessmentAnswers,
			[action.key]: action.value
		}
	};

	case 'SET_RISK_NOTE': return {...state, riskAssessmentNote: action.note};

	case 'SAVED_RISK_ASSESSMENT': return {
		...state,
		...action.data,
		riskAssessmentAnswers: {},
		riskAssessmentNote: '',
		loading: false
	};

	case '@@redux/INIT': return state;
	default:
		console.log('Unknown action type', action);
		return state;
	}
};

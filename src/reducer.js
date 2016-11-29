import { ls } from './utils';

var reducer = (state = {
	drawerOpen: false,
	userID: ls('userID'),
	route: '',
	loading: true,

	riskAssessmentAnswers: {},
	riskAssessmentNote: '',

	people: [],
	riskDimensions: [],

	showingDirectReports: {},

	allTables: []
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

	case 'SET_USER_ID':
		ls('userID', action.userID);
		return {...state, userID: action.userID};

	case 'SET_ROUTE': return {
		...state,
		route: action.route,
		routeParams: action.routeParams,
		drawerOpen: false
	};

	case 'SET_RISK_OPTION': return {
		...state,
		riskAssessmentAnswers: {
			...state.riskAssessmentAnswers,
			[action.key]: action.value
		}
	};

	case 'SET_RISK_NOTE': return {
		...state,
		riskAssessmentNote: action.note
	};

	case 'SAVED_RISK_ASSESSMENT': return {
		...state,
		...action.data,
		riskAssessmentAnswers: {},
		riskAssessmentNote: '',
		loading: false
	};

	case 'TOGGLE_SHOW_DIRECT_REPORTS': return {
		...state,
		showingDirectReports: {
			...state.showingDirectReports,
			[action.userID]: !state.showingDirectReports[action.userID]
		}
	};

	case 'LOAD_ALL_DATA': return {
		...state,
		allTables: action.data,
		loading: false,
		editRecord: null
	};
	case 'OPEN_EDITOR': return {
		...state,
		editRecord: {
			...action.editRecord,
			editTableName: action.editTableName
		}
	};
	case 'CLOSE_EDITOR': return {
		...state,
		editRecord: null
	};
	case 'EDIT_VALUE': return {
		...state,
		editRecord: {...state.editRecord, [action.key]: action.value}
	};

	case '@@redux/INIT': return state;
	default:
		console.log('Unknown action type', action);
		return state;
	}
};

export default reducer;

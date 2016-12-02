import { ls } from '../utils';
import app from './route';

var appReducers = {
	drawerOpen: (state = false, action) => {
		switch (action.type){
		case 'CLOSE_DRAWER':
		case '@@router/LOCATION_CHANGE': return false;
		case 'OPEN_DRAWER': return true;
		default: return state;
		}
	},

	userID: (state = ls('userID'), action) => {
		switch (action.type){
		case 'SET_USER_ID':
			ls('userID', action.userID);
			return action.userID;
		default: return state;
		}
	},

	data: (state = {
		people: [],
		riskAssessments: [],
		riskDimensions: []
	}, action) => {
		return action.type === 'RECEIVED_DATA' ? {...state, ...action.data} : state;
	},

	main: (state = {
		loading: true,
		error: false
	}, action) => {
		switch (action.type){
		case 'LOADING': return {...state, loading: true};
		case 'LOADED': return {...state, loading: false};
		case 'SET_ERROR':
			window.scrollTo(0, 0);
			return {...state, error: action.error, loading: false};
		case '@@router/LOCATION_CHANGE':
			window.scrollTo(0, 0);
			return state;
		default: return state;
		}
	}
};

var reducers = app.childRoutes.reduce((res, route) => {
	return route.reducer ? {...res, ...route.reducer} : res;
}, appReducers);

export default reducers;

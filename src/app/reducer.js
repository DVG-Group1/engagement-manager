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

	menuOpen: (state = false, action) => {
		switch (action.type){
		case 'CLOSE_MENU':
		case '@@router/LOCATION_CHANGE': return false;
		case 'OPEN_MENU': return true;
		default: return state;
		}
	},

	userID: (state = '', action) => {
		switch (action.type){
		case 'SET_TOKEN':

			var token = action.token;
			ls('token', token);

			if (token){
				try {
					return JSON.parse(atob(token.split('.')[1])).id;
				} catch (e){
					console.log('Token error', e, token);
				}
			}
			return '';
		case 'LOG_OUT':
			ls('token', '');
			return '';
		default: return state;
		}
	},

	data: (state = {
		people: [],
		riskAssessments: [],
		riskDimensions: [],
		riskRatings: [],
		riskOptions: []
	}, action) => {
		return action.type === 'RECEIVED_DATA' ? {...state, ...action.data} : state;
	},

	loading: (state = false, action) => {
		if (action.type === 'LOADING') return true;
		else if (action.type === 'LOADED') return false;
		return state;
	},

	redirect: (state = false, action) => {
		if (action.type === 'SET_REDIRECT') return action.path;
		return state;
	},

	error: (state = false, action) => {
		if (action.type === 'SET_ERROR'){
			window.scrollTo(0, 0);
			return action.error.toString();
		}
		return state;
	}

};

var reducers = app.childRoutes.reduce((res, route) => {
	return route.reducer ? {...res, ...route.reducer} : res;
}, appReducers);

export default reducers;

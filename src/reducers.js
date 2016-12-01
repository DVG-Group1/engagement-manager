import { ls } from './utils';

export default {
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


	riskAssessment: (state = {
		answers: {},
		note: ''
	}, action) => {
		switch (action.type){
		case 'SET_RISK_OPTION': return {
			...state,
			answers: {
				...state.answers,
				[action.key]: action.value
			}
		};
		case 'SET_RISK_NOTE': return {
			...state,
			note: action.note
		};
		case 'SAVED_RISK_ASSESSMENT': return {
			...state,
			...action.data,
			answers: {},
			note: '',
			loading: false
		};
		default: return state;
		}
	},


	data: (state = {
		people: [],
		riskDimensions: [],
	}, action) => {
		return action.type === 'RECEIVED_DATA' ? action.data : state;
	},


	directReportVisibility: (state = {}, action) => {
		if (action.type === 'TOGGLE_SHOW_DIRECT_REPORTS'){
			return {
				...state,
				[action.userID]: !state[action.userID]
			};
		}
		return state;
	},


	viewData: (state = {
		tables: {},
		editRecord: false
	}, action) => {
		switch (action.type){
		case 'LOAD_ALL_DATA': return {
			...state,
			tables: action.data,
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
		default: return state;
		}
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
			console.error(action.error);
			return {...state, error: action.error};
		case '@@router/LOCATION_CHANGE':
			window.scrollTo(0, 0);
			return state;
		default: return state;
		}
	}


};

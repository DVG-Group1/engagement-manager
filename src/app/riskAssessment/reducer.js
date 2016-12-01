export default {
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
	}
};

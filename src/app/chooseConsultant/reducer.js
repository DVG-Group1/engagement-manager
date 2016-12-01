export default {
	directReportVisibility: (state = {}, action) => {
		if (action.type === 'TOGGLE_SHOW_DIRECT_REPORTS'){
			return {
				...state,
				[action.userID]: !state[action.userID]
			};
		}
		return state;
	}
};

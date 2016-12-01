export default {
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
	}
};

export default {
	login: (state = {
		username: 'EMS0923',
		password: 'Siboda',
		failed: false
	}, action) => {
		switch (action.type){
		case 'CHANGE_LOGIN_USERNAME': return {
			...state,
			username: action.username,
			failed: false
		};
		case 'CHANGE_LOGIN_PASSWORD': return {
			...state,
			password: action.password,
			failed: false
		};
		case 'LOGIN_FAILED': return {
			...state,
			failed: true,
			password: ''
		};
		default: return state;
		}
	}
};

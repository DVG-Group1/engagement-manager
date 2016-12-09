export const request = (path, token, data) => {
	var params = data ? {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		})
	} : {
		headers: new Headers({
			'Authorization': 'Bearer ' + token
		})
	};
	return fetch(`http://localhost:3001/${path}`, params).then(response => {
		if (response.ok){
			return response.json();
		} else {
			console.log('not ok', response);
			throw response.statusText;
		}
	});
};

export const post = (resource, getData, onSuccess, onError) => (dispatch, getState) => {
	var state = getState();
	dispatch({type: 'LOADING'});
	request(resource, state.token, getData(state)).then(data => {
		dispatch({type: 'LOADED'});
		return onSuccess(data, state);
	}).catch(error => {
		dispatch({type: 'LOADED'});
		console.error(error);
		if (onError) onError(error, state);
		else dispatch({type: 'SET_ERROR', error});
	});
};

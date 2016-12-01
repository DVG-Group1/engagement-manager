// const convertTypes = tables => {
// 	Object.keys(tables).forEach(tableName => {
// 		Object.keys(tables[tableName][0] || {}).filter(col => col.includes('date')).forEach(col => {
// 			tables[tableName].forEach(row => {
// 				row[col] = new Date(row[col]);
// 			});
// 		});
// 	});
// 	return tables;
// };

const request = (path, data) => {
	if (data){
		data = {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'})
		};
	}
	return fetch(`http://localhost:3001/${path}`, data).then(r => r.json());
};

export const decorateRoutes = (route, store) => {
	if (route.loader){
		route.onEnter = () => {
			store.dispatch({type: 'LOADING'});
			request(route.loader.resource).then(data => {
				store.dispatch({type: route.loader.actionType, data});
				store.dispatch({type: 'LOADED'});
			}).catch(error => {
				store.dispatch({type: 'SET_ERROR', error});
				throw error;
			});
		};
	}
	if (route.childRoutes){
		route.childRoutes.forEach(decorateRoutes, store);
	}
};

export default request;

import { ls } from './utils';
import { browserHistory } from 'react-router';
import { request } from './dataService';

const decorateRoutes = (route, store) => {

	var login = () => {
		if (location.pathname !== '/login'){
			store.dispatch({type: 'SET_REDIRECT', path: location.pathname});
			browserHistory.push('/login');
		}
	};

	route.onEnter = () => {
		var token = ls('token');
		if (!token) login();
		else if (route.loader){
			store.dispatch({type: 'LOADING'});
			request(route.loader.resource, token).then(data => {
				store.dispatch({type: route.loader.actionType, data});
				store.dispatch({type: 'LOADED'});
			}).catch(error => {
				store.dispatch({type: 'LOADED'});
				if (error === 'Unauthorized') login();
				else {
					store.dispatch({type: 'SET_ERROR', error});
				}
			});
		}
	};

	if (route.childRoutes){
		route.childRoutes.forEach(r => decorateRoutes(r, store));
	}
};

export default decorateRoutes;

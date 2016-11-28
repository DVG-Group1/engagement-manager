import routes from './routes';
import { connect } from 'react-redux';

export default connect(
	state => ({}),
	dispatch => {
		console.log('Adding hashchange event listener.');

		const hashChange = () => {
			var path = location.hash.substring(2);
			var route = routes.find(r => r.regex ? r.regex.test(path) : r.path === path);
			if (route){
				var routeParams = {};
				if (route.params && route.regex){
					var match = path.match(route.regex);
					route.params.forEach((param, i) => {
						routeParams[param] = match[i + 1];
					});
				}
				dispatch({type: 'SET_ROUTE', route, routeParams});
				window.scrollTo(0, 0);
			} else {
				console.error(path + ' is invalid.');
				history.back();
			}
		};

		window.addEventListener('hashchange', hashChange);
		hashChange();

		return {};
	}
)(props => props.children);

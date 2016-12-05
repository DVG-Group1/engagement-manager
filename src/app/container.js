import { connect } from 'react-redux';
import presentation from './presentation';

export default connect(
	(state, ownProps) => {
		var route = ownProps.routes[ownProps.routes.length - 1];
		var routeTitle = route ? route.label : 'DERP';
		if (route && route.subItems){
			var subItem = route.subItems.find(s => s.path === location.pathname);
			if (subItem) routeTitle = route.label + ': ' + subItem.label;
		}
		return {
			error: state.main.error,
			loading: state.main.loading,
			routes: ownProps.route.childRoutes,
			routeParams: ownProps.params,
			route,
			routeTitle
		};
	}
)(presentation);

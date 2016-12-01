import { connect } from 'react-redux';
import presentation from './presentation';

export default connect(
	(state, ownProps) => ({
		error: state.main.error,
		loading: state.main.loading,
		routes: ownProps.route.childRoutes,
		route: ownProps.routes[ownProps.routes.length - 1]
	})
)(presentation);

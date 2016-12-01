import React from 'react';
import AppBar from './appBar';
import AppDrawer from './appDrawer';
import { connect } from 'react-redux';

var App = ({error, loading, routes, route, children}) => (
	<div>
		<AppDrawer routes={routes} route={route} />
		<AppBar route={route} />
		<div style={{margin: 24}}>
			{
				error && (
					<div style={{margin: '50px 0'}}>{ error.message }</div>
				)
			}
			{ children }
		</div>

		<div style={{
			display: loading ? 'block' : 'none',
			position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
			backgroundColor: 'rgba(0,0,0,0.5)',
			fontSize: 72,
			color: 'white',
			textAlign: 'center',
			paddingTop: 200,
			textShadow: '2px 5px 10px rgba(0,0,0,0.2)'
		}}>loading...</div>

	</div>
);

export default connect(
	(state, ownProps) => ({
		error: state.main.error,
		loading: state.main.loading,
		routes: ownProps.route.childRoutes,
		route: ownProps.routes[ownProps.routes.length - 1]
	})
)(App);

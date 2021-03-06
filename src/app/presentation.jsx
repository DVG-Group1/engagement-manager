import React from 'react';
import { CircularProgress } from 'material-ui';
import AppBar from './appBar';
import AppDrawer from './appDrawer';
import ErrorMessage from './errorMessage';

export default ({error, loading, routes, routeTitle, loggedIn, children}) => (
	<div>
		{ loggedIn && <AppDrawer routes={routes} routeTitle={routeTitle} /> }
		{ loggedIn && <AppBar routeTitle={routeTitle} /> }
		<div style={{margin: 24}}>
			<ErrorMessage />
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
		}}>
			<CircularProgress size={128} thickness={7} />
		</div>

	</div>
);

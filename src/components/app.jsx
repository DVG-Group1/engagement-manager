import React from 'react';
import AppBar from './appBar';
import AppDrawer from './drawer';
import { connect } from 'react-redux';
import routes from '../routes';

export default connect(
	state => ({
		error: state.error ? state.error.message : null,
		route: state.route,
		loading: state.loading
	})
)(props => {

	var route = routes.find(r => r.path === props.route);
	return (
		<div>
			<AppDrawer />
			<AppBar />
			<div style={{margin: 24}}>
				{ props.error }
				{ route ? <route.component /> : 'Nothing here.'}
			</div>

			<div style={{
				display: props.loading ? 'block' : 'none',
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
});

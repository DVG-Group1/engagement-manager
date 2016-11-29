import React from 'react';
import { Drawer, MenuItem, AppBar } from 'material-ui';
import { connect } from 'react-redux';
import routes from '../routes';

export default connect(
	state => ({
		drawerOpen: state.drawerOpen,
		route: state.route
	}),
	dispatch => ({
		closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
	})
)(props => {
	var route = routes.find(r => r.path === props.route);

	return (
		<Drawer
			docked={false}
			open={props.drawerOpen}
			onRequestChange={props.closeDrawer}
		>
			<AppBar
				title={route ? route.label : 'DERP'}
				showMenuIconButton={false}
				titleStyle={{fontWeight: 'lighter'}}
			/>

			{
				routes.filter(r => !r.regex).map(r => {
					var Icon = r.icon;
					return (
						<a key={r.path} href={'#/' + r.path}>
							<MenuItem leftIcon={<Icon/>} >
								{r.drawerLabel || r.label}
							</MenuItem>
						</a>
					);
				})
			}

		</Drawer>
	);
});

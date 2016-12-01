import React from 'react';
import { Drawer, MenuItem, AppBar } from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router';

var AppDrawer = ({drawerOpen, routesToList, route, closeDrawer}) => (
	<Drawer
		docked={false}
		open={drawerOpen}
		onRequestChange={closeDrawer}
	>
		<AppBar
			title={route ? route.drawerLabel || route.label : 'DERP'}
			showMenuIconButton={false}
			titleStyle={{fontWeight: 'lighter'}}
		/>

		{
			routesToList.filter(r => r.icon).map(r => (
				<Link key={r.path} to={'/' + r.path}>
					<MenuItem leftIcon={<r.icon/>} >
						{r.drawerLabel || r.label}
					</MenuItem>
				</Link>
			))
		}

	</Drawer>
);

export default connect(
	(state, ownProps) => ({
		drawerOpen: state.drawerOpen,
		routesToList: ownProps.routes.filter(r => r.icon),
		route: ownProps.route
	}),
	dispatch => ({
		closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
	})
)(AppDrawer);

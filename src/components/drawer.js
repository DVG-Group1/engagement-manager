import React from 'react';
import { Drawer, MenuItem, AppBar } from 'material-ui';
import { connect } from 'react-redux';

export default connect(
	state => ({
		drawerOpen: state.drawerOpen,
		appName: state.route.label,
		routes: state.routes
	}),
	dispatch => ({
		closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
	})
)(props => (
	<Drawer
		docked={false}
		open={props.drawerOpen}
		onRequestChange={props.closeDrawer}
	>
		<AppBar
			title={props.appName}
			showMenuIconButton={false}
			titleStyle={{fontWeight: 'lighter'}}
		/>

		{
			props.routes.filter(r => !r.regex).map(r => {
				var Icon = r.icon;
				return (
					<a key={r.path} href={'#/' + r.path}>
						<MenuItem
							onTouchTap={props.closeDrawer}
							leftIcon={<Icon/>}
						>
							{r.drawerLabel || r.label}
						</MenuItem>
					</a>
				);
			})
		}

	</Drawer>
));

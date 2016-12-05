import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Drawer, MenuItem, AppBar } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

var buildMenu = items => items.map(r => (
	<MenuItem
		key={r.path}
		primaryText={r.label}
		leftIcon={r.icon && <r.icon/>}
		rightIcon={r.subItems && <ArrowDropRight />}
		menuItems={r.subItems && buildMenu(r.subItems)}
		onTouchTap={() => !r.subItems && browserHistory.push(r.path)}
	/>
));

var AppDrawer = ({drawerOpen, menuItems, routeTitle, closeDrawer}) => (
	<Drawer
		docked={false}
		open={drawerOpen}
		onRequestChange={closeDrawer}
	>
		<AppBar
			title={routeTitle ? routeTitle : 'DERP'}
			showMenuIconButton={false}
			titleStyle={{fontWeight: 'lighter'}}
		/>

	{buildMenu(menuItems)}

	</Drawer>
);

export default connect(
	(state, ownProps) => {

		return {
			drawerOpen: state.drawerOpen,
			menuItems: ownProps.routes.filter(r => r.icon).map(r => {
				return {...r, subItems: r.getSubItems ? r.getSubItems(state) : r.subItems};
			}),
			routeTitle: ownProps.routeTitle
		};
	},
	dispatch => ({
		closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
	})
)(AppDrawer);

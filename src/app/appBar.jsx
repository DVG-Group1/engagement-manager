import React from 'react';
import { AppBar, FlatButton, Popover, Menu, MenuItem } from 'material-ui';

var Bar = ({username, routeTitle, openDrawer, menuOpen, openMenu, closeMenu, logOut}) => {

	var rightMenu = (
		<span>
			<FlatButton
				label={username || ' '}
				onTouchTap={openMenu}
				style={{color: 'white', marginTop: 6}}
			/>
			<Popover
				open={menuOpen}
				onRequestClose={closeMenu}
			>
				<Menu>
					<MenuItem primaryText="Log Out" onTouchTap={logOut} />
				</Menu>
			</Popover>
		</span>
	);

	return (
		<AppBar
			title={routeTitle}
			onLeftIconButtonTouchTap={openDrawer}
			iconElementRight={rightMenu}
		/>
	);
};


import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default connect(
	(state, ownProps) => {
		var user = state.data.people.find(p => p.id === state.userID);
		return {
			username: user ? user.first_name + ' ' + user.last_name: '',
			routeTitle: ownProps.routeTitle,
			menuOpen: state.menuOpen
		};
	},
	dispatch => ({
		openDrawer: () => dispatch({type: 'OPEN_DRAWER'}),
		openMenu: () => dispatch({type: 'OPEN_MENU'}),
		closeMenu: () => dispatch({type: 'CLOSE_MENU'}),
		logOut: () => {
			dispatch({type: 'LOG_OUT'});
			browserHistory.push('/login');
		}
	})
)(Bar);

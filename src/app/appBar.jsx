import React from 'react';
import { AppBar, DropDownMenu, MenuItem } from 'material-ui';
import { connect } from 'react-redux';

var Bar = ({userID, managers, routeTitle, changeUser, openDrawer}) => {

	var userSelector = (
		<DropDownMenu
			underlineStyle={{display: 'none'}}
			labelStyle={{color: 'white'}}
			value={userID}
			onChange={(e,k,value) => changeUser(value)}
			style={{marginTop: -4}}
		>{
			managers.map(p =>
				<MenuItem key={p.id} value={p.id} primaryText={p.first_name + ' ' + p.last_name} />
			)
		}</DropDownMenu>
	);

	return (
		<AppBar
			title={routeTitle}
			onLeftIconButtonTouchTap={openDrawer}
			iconElementRight={userSelector}
		/>
	);
};

export default connect(
	(state, ownProps) => ({
		userID: state.userID,
		managers: state.data.people.filter(p => state.data.people.some(r => r.manager_id === p.id)),
		routeTitle: ownProps.routeTitle
	}),
	dispatch => ({
		changeUser: userID => dispatch({type: 'SET_USER_ID', userID}),
		openDrawer: () => dispatch({type: 'OPEN_DRAWER'})
	})
)(Bar);

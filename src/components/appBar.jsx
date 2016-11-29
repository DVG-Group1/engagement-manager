import React from 'react';
import { AppBar, DropDownMenu, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import routes from '../routes';

export default connect(
	(state, ownProps) => ({
		userID: state.userID,
		people: state.people,
		route: state.route
	}),
	dispatch => ({
		changeUser: userID => dispatch({type: 'SET_USER_ID', userID}),
		openDrawer: () => dispatch({type: 'OPEN_DRAWER'})
	})
)(props => {

	var userSelector = (
		<DropDownMenu
			underlineStyle={{display: 'none'}}
			labelStyle={{color: 'white'}}
			value={ props.userID }
			onChange={(e,k,value) => props.changeUser(value)}
		>{
			props.people.filter(p =>
				props.people.some(r => r.manager_id === p.id)
			).map(p =>
				<MenuItem key={p.id} value={p.id} primaryText={p.first_name + ' ' + p.last_name} />
			)
		}</DropDownMenu>
	);

	var route = routes.find(r => r.path === props.route);
	return (
		<AppBar
			title={route ? route.label : 'DERP'}
			onLeftIconButtonTouchTap={props.openDrawer}
			iconElementRight={userSelector}
		/>
	);
});

import React from 'react';
import { AppBar, DropDownMenu, MenuItem } from 'material-ui';

var Bar = props => {

	var userSelector = (
		<DropDownMenu
			underlineStyle={{display: 'none'}}
			labelStyle={{color: 'white'}}
			value={ props.userID }
			onChange={(e,k,value) => props.changeUser(value)}
		>{
			props.people.map(p =>
				<MenuItem key={p.id} value={p.id} primaryText={p.first_name + ' ' + p.last_name} />
			)
		}</DropDownMenu>
	);

	// var userSelector = props.user ? <FlatButton label={
	// 	props.user.first_name + ' ' + props.user.last_name
	// } /> : null;

	return (
		<AppBar
			title={props.title}
			onLeftIconButtonTouchTap={props.openDrawer}
			iconElementRight={userSelector}
		/>
	);
};

export default Bar;

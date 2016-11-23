import React from 'react';
import { AppBar, DropDownMenu, MenuItem } from 'material-ui';

var appBar = props => {

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

	return (
		<AppBar
			title={props.title}
			onLeftIconButtonTouchTap={props.openDrawer}
			iconElementRight={userSelector}
		/>
	);
};

export default appBar;

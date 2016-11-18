import React from 'react';
import { Drawer, MenuItem } from 'material-ui';

const MenuExampleSimple = () => (
	<Drawer open={true}>
		<MenuItem>Do Some Stuff</MenuItem>
		<MenuItem>Do Other Things</MenuItem>
	</Drawer>
);

export default MenuExampleSimple;

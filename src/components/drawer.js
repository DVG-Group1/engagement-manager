import React from 'react';
import { Drawer, MenuItem, AppBar } from 'material-ui';

var AppDrawer = props => (
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
			props.routes.filter(r => r.path !== undefined).map(r => {
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
);


export default AppDrawer;

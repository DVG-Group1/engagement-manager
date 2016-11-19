import React, {Component} from 'react';
import { Drawer, MenuItem, AppBar } from 'material-ui';
import { Router, Route, Link, browserHistory } from 'react-router';

import RiskAssessment from './riskAssessment';

const appName = 'DERP';

var routes = [{
	label: 'Risk Assessment',
	path: 'risk-assessment',
	component: RiskAssessment
}];

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			drawerOpen: false
		};
		// console.log(props);
	}

	render() {
		var items = routes.map(r =>
			<MenuItem
				key={r.path}
				onTouchTap={() => this.setState({drawerOpen: false})}
			>
				<Link to={'/' + r.path}>{r.label}</Link>
			</MenuItem>
		);

		var headerLabel = (routes.find(r => '/' + r.path === location.pathname) || {label: appName}).label;

		return (
			<div>

				<Drawer
					docked={false}
					open={this.state.drawerOpen}
					onRequestChange={drawerOpen => this.setState({drawerOpen})}
				>
					<AppBar
						title={appName}
						showMenuIconButton={false}
						titleStyle={{fontWeight: 'lighter'}}
					/>
					{ items }
				</Drawer>

				<AppBar
					title={headerLabel}
					onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
				/>

			<div style={{margin: '32px 64px'}}>
					{ this.props.children }
				</div>

			</div>
		);
	}
}

var Main = () => {
	var routeDefs = routes.map(r =>
		<Route key={r.path} path={r.path} component={r.component}/>
	);

	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>{ routeDefs }</Route>
		</Router>
	);
};

export default Main;

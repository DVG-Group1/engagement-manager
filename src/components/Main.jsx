import React, {Component} from 'react';
import routes from '../routes';
import request from '../dataService';

import AppBar from './appBar';
import AppDrawer from './drawer';

const appName = 'DERP';

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			drawerOpen: false,
			userID: 84,
			people: []
		};

		this.hashChange = (function(){
			var path = location.hash.substring(2);
			var route = routes.find(r => r.path !== undefined ? r.path === path : r.regex.test(path));
			if (route){
				var routeParams = {};
				if (route.params && route.regex){
					var match = path.match(route.regex);
					route.params.forEach((param, i) => {
						routeParams[param] = match[i + 1];
					});
				}
				this.setState({route, ...routeParams});
			} else {
				console.error(path + ' is invalid.');
				history.back();
			}
		}).bind(this);

		window.addEventListener('hashchange', this.hashChange);
	}
	componentDidMount(){
		request('people').then(people => {
			this.setState({people});
		}).catch(this.onError);
		this.hashChange();
	}
	onError = (error) => {
		console.error(error);
		this.setState({error});
	}
	render() {
		return (
			<div>

				<AppDrawer
					appName={appName}
					drawerOpen={this.state.drawerOpen}
					closeDrawer={() => this.setState({drawerOpen: false})}
					routes={routes}
				/>

				<AppBar
					title={(this.state.route || {}).label}
					openDrawer={() => this.setState({drawerOpen: true})}
					people={this.state.people}
					userID={this.state.userID}
					changeUser={userID => this.setState({userID})}
				/>

				<div style={{margin: 24}}>
					{ this.state.error ? this.state.error.message : null }
					{ this.state.route ? <this.state.route.component { ...this.state } onError={this.onError} /> : ''}
				</div>

			</div>
		);
	}
}

export default App;

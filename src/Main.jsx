import React, {Component} from 'react';
// import { Router, Route, browserHistory } from 'react-router';
import routes from './routes';
import AppBar from './appBar';
import AppDrawer from './drawer';
import request from './dataService';

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
		}).catch(err => {
			throw err;
		});
		this.hashChange();
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
					{ this.state.route ? <this.state.route.component { ...this.state }/> : ''}
				</div>

			</div>
		);
	}
}

// class Main extends Component{
// 	constructor(props, context) {
// 		super(props, context);
// 		this.state = {
// 			user: {
// 				id: 84,
// 				first_name: 'Eric',
// 				last_name: 'Siboda'
// 			}
// 		};
// 	}
// 	componentDidMount(){
// 		request('people').then(people => {
// 			this.setState({people});
// 		}).catch(err => {
// 			throw err;
// 		});
// 	}
// 	render(){
//
// 		var getRoutes = routes => {
// 			return routes.map(route =>
// 				<Route key={route.path} { ...route }>
// 					{ route.children ? getRoutes(route.children) : null }
// 				</Route>
// 			);
// 		};
//
// 		return (
// 			<Router history={browserHistory}>
// 				<Route path="/" component={App} user={this.state.user}>{ getRoutes(routes) }</Route>
// 			</Router>
// 		);
// 	}
// };

export default App;

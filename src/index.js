import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducers from './app/reducer';
import routes from './app/route';
import { decorateRoutes } from './dataService';

// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
require('react-tap-event-plugin')();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	}),
	applyMiddleware(
		thunkMiddleware,
		createLogger()
	)
);

const history = syncHistoryWithStore(browserHistory, store);

decorateRoutes(routes, store);

render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

import 'babel-polyfill';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';

var store = createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware,
		createLogger()
	)
);

import request from './dataService';
request('init/' + store.getState().userID).then(data => {
	store.dispatch({type: 'RECEIVED_DATA', data});
}).catch(error => {
	store.dispatch({type: 'SET_ERROR', error});
});

// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
require('react-tap-event-plugin')();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import App from './components/app';

render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

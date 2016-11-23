import React from 'react';
import { render } from 'react-dom';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
require('react-tap-event-plugin')();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducer';
// var store = createStore(reducer);

import Main from './components/Main';

render(
	// <Provider store={store}>
	// 	<MuiThemeProvider>
	// 		<Main />
	// 	</MuiThemeProvider>
	// </Provider>,
	<MuiThemeProvider>
		<Main />
	</MuiThemeProvider>,
	document.getElementById('root')
);

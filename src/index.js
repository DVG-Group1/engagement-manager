import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './index.css';

render(
  <App />,
  document.getElementById('root')
);

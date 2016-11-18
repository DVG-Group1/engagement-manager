import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import Main from './Main';

const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

export default App;

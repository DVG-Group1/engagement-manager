/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import { RaisedButton, Dialog, FlatButton } from 'material-ui';

import Menu from './menu';

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
			<div>
				<Menu/>
				<div style={{ textAlign: 'center', paddingTop: 200 }}>
					<Dialog
						open={this.state.open}
						title="Super Secret Password"
						actions={standardActions}
						onRequestClose={this.handleRequestClose}
					>
						1-2-3-4-5 And what not
					</Dialog>

					<h1>Material-UI</h1>
					<h2>example project</h2>
					<RaisedButton
						label="Super Secret Password"
						secondary={true}
						onTouchTap={this.handleTouchTap}
					/>
				</div>
			</div>
    );
  }
}

export default Main;

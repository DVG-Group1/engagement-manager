import React, {Component} from 'react';
import { Drawer, MenuItem } from 'material-ui';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return (
			<div>
				<Drawer open={true}>
					<MenuItem>Risk Assessment</MenuItem>
				</Drawer>
			</div>
    );
  }
}

export default Main;

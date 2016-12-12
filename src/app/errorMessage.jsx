import React from 'react';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
// import ErrorIcon from 'material-ui/svg-icons/alert/error';

var presentation = ({error, dismiss}) => error && (
	<div style={{background: '#FAA', padding: 10}}>
		{ error }
		<FlatButton label="Dismiss" onTouchTap={dismiss}/>
	</div>
);

export default connect(
	state => ({
		error: state.error
	}),
	dispatch => ({
		dismiss: () => dispatch({type: 'SET_ERROR', error: ''})
	})
)(presentation);

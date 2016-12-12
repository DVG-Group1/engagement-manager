import React from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import ErrorMessage from '../errorMessage';

export default ({onSubmit, username, password, failed, error, changeUsername, changePassword}) => (
	<form style={{textAlign: 'center', background: '#EEE', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}} onSubmit={onSubmit}>

		<div style={{display: 'inline-block', textAlign: 'left'}}>
			<h1>Sign In</h1>
			<Paper style={{padding: 20, background: 'white'}} zDepth={3}>
				<ErrorMessage />
				<TextField floatingLabelText="Daugherty Username" value={username} onChange={changeUsername} />
				<br/>
				<TextField floatingLabelText="Password" type="password" errorText={failed && 'Invalid username or password.'} value={password} onChange={changePassword}/>
				<br/>
				<RaisedButton type="submit" label="Log In" primary={true} disabled={!username.length} style={{width: '100%', marginTop: 32}} />

			</Paper>
		</div>

	</form>
);

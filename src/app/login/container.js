import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { post } from '../../dataService';
import presentation from './presentation';

export default connect(
	state => ({
		username: state.login.username,
		password: state.login.password,
		failed: state.login.failed
	}),
	(dispatch, ownProps) => console.log(ownProps) || ({
		onSubmit: e => {
			e.preventDefault();
			return dispatch(post(
				'login',
				state => ({
					username: state.login.username,
					password: state.login.password
				}),
				(data, state) => {
					dispatch({type: 'SET_TOKEN', token: data.token});
					ownProps.routes[0].onEnter();
					browserHistory.push(state.redirect || '/home');
				},
				error => dispatch(error === 'Unauthorized' ? {type: 'LOGIN_FAILED'} : {type: 'SET_ERROR', error})
			));
		},
		changeUsername: e => dispatch({type: 'CHANGE_LOGIN_USERNAME', username: e.target.value}),
		changePassword: e => dispatch({type: 'CHANGE_LOGIN_PASSWORD', password: e.target.value})
	})
)(presentation);

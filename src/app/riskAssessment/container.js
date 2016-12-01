import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { riskColors } from '../../config';
import request from '../../dataService';
import presentation from './presentation';

export default connect(
	(state, ownProps) => ({
		riskDimensions: state.data.riskDimensions.map(r => {
			r.options = state.data.riskOptions.filter(o => o.risk_dimension_id === r.id);
			return r;
		}),
		assessee: state.data.people.find(p => p.id === +ownProps.params.assessee) || {},
		answers: state.riskAssessment.answers,
		note: state.riskAssessment.note,
		riskColors
	}),
	(dispatch, ownProps) => ({
		setRiskOption: (risk_dimension_id, value) => dispatch({type: 'SET_RISK_OPTION', key: risk_dimension_id, value}),
		setRiskNote: e => dispatch({type: 'SET_RISK_NOTE', note: e.target.value}),
		handleSubmit: () => dispatch((dispatch, getState) => {
			var state = getState();
			// dispatch({type: 'LOADING'});

			request('riskAssessment', {
				assesser: state.userID,
				assessee: +ownProps.params.assessee,
				answers: state.riskAssessment.answers,
				note: state.riskAssessment.note
			}).then(data => {
				dispatch({type: 'SAVED_RISK_ASSESSMENT', data});
				push('/choose-consultant');
				// location.hash = '#/choose-consultant';
			}).catch(error => {
				console.error(error);
				dispatch({type: 'SET_ERROR', error});
			});
		})
	})
)(presentation);

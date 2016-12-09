import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { riskColors } from '../../config';
import { post } from '../../dataService';
import presentation from './presentation';

export default connect(
	(state, ownProps) => ({
		riskDimensions: state.data.riskDimensions.map(r => {
			r.options = state.data.riskOptions.filter(o => o.risk_dimension_id === r.id);
			return r;
		}),
		assessee_id: state.data.people.find(p => p.id === +ownProps.params.assessee_id) || {},
		answers: state.riskAssessment.answers,
		note: state.riskAssessment.note,
		riskColors
	}),
	(dispatch, ownProps) => ({
		setRiskOption: (risk_dimension_id, value) => dispatch({type: 'SET_RISK_OPTION', key: risk_dimension_id, value}),
		setRiskNote: e => dispatch({type: 'SET_RISK_NOTE', note: e.target.value}),
		handleSubmit: () => dispatch(post(
			'riskAssessment',
			state => ({
				assesser_id: state.userID,
				assessee_id: +ownProps.params.assessee_id,
				answers: state.riskAssessment.answers,
				note: state.riskAssessment.note
			}),
			data => {
				dispatch({type: 'RECEIVED_DATA', data});
				dispatch({type: 'SAVED_RISK_ASSESSMENT'});
				browserHistory.push('/choose-consultant');
			}
		))
	})
)(presentation);

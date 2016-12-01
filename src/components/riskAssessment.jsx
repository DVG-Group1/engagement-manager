import React from 'react';
import { RaisedButton, TextField, RadioButton, RadioButtonGroup, Card, CardText, CardTitle } from 'material-ui';
import request from '../dataService';
import { riskColors } from '../config';
import { push } from 'react-router-redux';

const cardStyle = {marginBottom: 20};

var RiskAssessment = ({riskDimensions, assessee, answers, note, setRiskOption, setRiskNote, handleSubmit}) => (
	<div>
		{
			riskDimensions.map(r => (
				<Card key={r.id} style={cardStyle}>
					<CardTitle title={r.description.replace(/consultant/ig, assessee.first_name)} />
					<CardText>
						<RadioButtonGroup
							name="riskOptions"
							valueSelected={answers[r.id]}
							onChange={(e, value) => setRiskOption(r.id, value)}
						>{

							r.options.map((o, i) => (
								<RadioButton
									key={i}
									value={i}
									label={o.description.replace(/consultant/ig, assessee.first_name)}
									style={{marginBottom: 16, borderLeft: `5px solid ${riskColors[i]}`, paddingLeft: 16}}
								/>
							))

						}</RadioButtonGroup>
					</CardText>
				</Card>
			))
		}
		<Card style={cardStyle}>
			<CardText>
				<TextField
					floatingLabelText="Notes and comments."
					multiLine={true}
					rows={3}
					style={{width: '100%'}}
					value={note}
					onChange={setRiskNote}
				/>
			</CardText>
		</Card>

		<RaisedButton label='Submit' primary={true} onClick={handleSubmit} />
	</div>
);

import { connect } from 'react-redux';
export default connect(
	(state, ownProps) => ({
		riskDimensions: state.data.riskDimensions.map(r => {
			r.options = state.data.riskOptions.filter(o => o.risk_dimension_id === r.id);
			return r;
		}),
		assessee: state.data.people.find(p => p.id === +ownProps.params.assessee) || {},
		answers: state.riskAssessment.answers,
		note: state.riskAssessment.note
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
)(RiskAssessment);

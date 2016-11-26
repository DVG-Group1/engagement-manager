import React from 'react';
import { RaisedButton, TextField, RadioButton, RadioButtonGroup, Card, CardText, CardTitle } from 'material-ui';
import request from './../dataService';

const cardStyle = {marginBottom: 20};
const optionColors = ['#009E03', '#7FAD00', '#DECF00', '#D4A200', '#B50000'];

import { connect } from 'react-redux';
export default connect(
	state => ({
		people: state.people,
		riskDimensions: state.riskDimensions.map(r => {
			r.options = state.riskOptions.filter(o => o.risk_dimension_id === r.id);
			return r;
		}),
		assessee: state.people.find(p => p.id === +state.routeParams.assessee) || {},
		answers: state.riskAssessmentAnswers,
		note: state.riskAssessmentNote
	}),
	dispatch => ({
		setRiskOption: (risk_dimension_id, value) => dispatch({type: 'SET_RISK_OPTION', key: risk_dimension_id, value}),
		setRiskNote: e => dispatch({type: 'SET_RISK_NOTE', note: e.target.value}),
		handleSubmit: () => dispatch((dispatch, getState) => {
			var state = getState();
			dispatch({type: 'LOADING'});

			request('riskAssessment', {
				assesser: state.userID,
				assessee: state.routeParams.assessee,
				answers: state.riskAssessmentAnswers,
				note: state.riskAssessmentNote
			}).then(data => {
				dispatch({type: 'SAVED_RISK_ASSESSMENT', data});
			}).catch(error => {
				dispatch({type: 'SET_ERROR', error});
			});
		})
	})
)(props => (
	<div>
		{
			props.riskDimensions.map(r => (
				<Card key={r.id} style={cardStyle}>
					<CardTitle title={r.description.replace(/consultant/ig, props.assessee.first_name)} />
					<CardText>
						<RadioButtonGroup
							name="riskOptions"
							valueSelected={props.answers[r.id]}
							onChange={(e, value) => props.setRiskOption(r.id, value)}
						>{

							r.options.map((o, i) => (
								<RadioButton
									key={i}
									value={i}
									label={o.description.replace(/consultant/ig, props.assessee.first_name)}
									style={{marginBottom: 16, borderLeft: `5px solid ${optionColors[i]}`, paddingLeft: 16}}
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
					value={props.note}
					onChange={props.setRiskNote}
				/>
			</CardText>
		</Card>

		<RaisedButton label='Submit' primary={true} onClick={props.handleSubmit} />
	</div>
));

import React from 'react';
import { RaisedButton } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { riskFactors, optionColors } from './mock-data';

var RiskAssessment = () => {

	var cards = riskFactors.map((r, i) => {

		var radios = r.options.map((optionText, j) => {
			return (
				<RadioButton
					key={j}
					value={j}
					label={optionText}
					style={{marginBottom: 16, borderLeft: `5px solid ${optionColors[j]}`, paddingLeft: 16}}
				/>
			);
		});

		return (
			<Card key={i} style={{marginBottom: 20}}>
				<CardTitle title={r.text} />
				<CardText>
					<RadioButtonGroup
						name="riskOptions"
						onChange={e => console.log(e)}
					>{radios}</RadioButtonGroup>
				</CardText>
			</Card>
		)
	});

	return (
		<div>
			<p>This is where you can assess risks or whatever.</p>
			{ cards }
			<RaisedButton label='Submit' primary={true} />
		</div>
	);
};

export default RiskAssessment;

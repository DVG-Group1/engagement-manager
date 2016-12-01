import React from 'react';
import { RaisedButton, TextField, RadioButton, RadioButtonGroup, Card, CardText, CardTitle } from 'material-ui';

const cardStyle = {marginBottom: 20};

export default ({riskDimensions, assessee, answers, note, setRiskOption, setRiskNote, handleSubmit, riskColors}) => (
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

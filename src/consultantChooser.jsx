import React from 'react';
import { RaisedButton, Card, CardTitle, CardActions } from 'material-ui';

const cardStyle = {marginBottom: 20};

const ConsultantChooser = props => {

	var cards = props.people.filter(
		p => p.first_name && (p.manager_id === props.userID)
	).map(r => {

		return (
			<Card key={r.id} style={cardStyle}>
				<CardTitle title={(r.first_name) + ' ' + r.last_name} />
				<CardActions>
					<a href={'#/new-risk-assessment/' + r.id}>
						<RaisedButton label='New Risk Assessment' primary={true} />
					</a>
					<a href={'#/risk-history/' + r.id}>
						<RaisedButton label='Previous Assessments' />
					</a>
				</CardActions>
			</Card>
		);
	});

	return (
		<div>{ cards }</div>
	);
}

export default ConsultantChooser;

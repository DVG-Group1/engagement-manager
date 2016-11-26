import React from 'react';
import { RaisedButton, Card, CardTitle, CardText, CardActions } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import moment from 'moment';

const cardStyle = {marginBottom: 20};
const formatDate = date => moment(date).format('MMM Do YYYY');

export default connect(
	state => ({
		people: state.people,
		userID: state.userID,
		assessments: state.riskAssessments,
		riskDimensions: state.riskDimensions,
		ratings: state.riskRatings
	})
)(props => {

	var cards = props.people.filter(
		p => p.last_name && (p.manager_id === props.userID)
	).map(p => {

		var assessments = props.assessments.filter(a => a.assessee === p.id).map(a => (
			<div key={a.id}>
				<strong>Assessent on { formatDate(a.date_added) }</strong>
				<div style={{marginLeft: 15}}>{
					props.riskDimensions.map(d => {
						var rating = props.ratings.find(r => r.risk_assessment_id === a.id && r.risk_dimension_id === d.id);
						return (
							<div key={d.id}>
								{rating ? rating.rating + ': ' : ''}
								{d.name}
							</div>
						);
					})
				}</div>
			</div>
		));

		if (!assessments.length){
			assessments = (
				<span style={{color: '#CCC'}}>No assessments to see here.</span>
			);
		}

		return (
			<Card key={p.id} style={cardStyle}>
				<CardTitle title={(p.first_name) + ' ' + p.last_name} />
				<CardText>
					{ assessments }
				</CardText>
				<CardActions>
					<RaisedButton
						label='New Risk Assessment'
						href={'#/new-risk-assessment/' + p.id}
						primary={true}
						icon={<AddIcon/>}
			 		/>
				</CardActions>
			</Card>
		);
	});

	return (
		<div>{ cards }</div>
	);
});

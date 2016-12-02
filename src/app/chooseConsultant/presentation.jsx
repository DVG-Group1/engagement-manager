import React from 'react';
import { RaisedButton, Card, CardTitle, CardText, CardActions } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

import { Link } from 'react-router';
import moment from 'moment';
import ConsultantCardList from './container';

const cardStyle = {marginBottom: 20};
const formatDate = date => moment(date).format('MMM Do YYYY');

export default ({directReports, showingDirectReports, toggleshowDirectReports, riskColors}) => {

	var cards = directReports.map(person => {

		var assessmentList = person.assessments.length && (
			<CardText style={{maxHeight: 120, overflowY: 'auto'}}>{
				person.assessments.map(assessment => (
					<div key={assessment.id}>
						<strong>Assessent on { formatDate(assessment.date_added) }</strong>
						<div style={{marginLeft: 15}}>
							{
								assessment.riskDimensions.filter(r => r.rating).map(riskDimension => (
									<div key={riskDimension.id}>
										<span style={{color: riskColors[riskDimension.rating.rating]}}>
											{riskDimension.rating.rating + 1}
										</span>
										{ ': ' + riskDimension.name }
									</div>
								))
							}
							{
								assessment.note && (
									<div>Note: { assessment.note }</div>
								)
							}
						</div>
					</div>
				))
			}</CardText>
		);

		//<RiskGraph assessments={person.assessments}/>

		var title = (
			<span style={{ color: riskColors[person.riskLevel] }}>{ person.label }</span>
		);

		var showDirectReports = showingDirectReports[person.id];

		var toggleshowDirectReportsButton = person.directReports.length > 0 && (
			<RaisedButton
				label={(showDirectReports ? 'Hide' : 'Show') + ' Direct Reports'}
				onTouchTap={() => toggleshowDirectReports(person.id)}
			/>
		);

		var directReportCards = person.directReports.length > 0 && showDirectReports && (
			<CardText style={{marginLeft: 20}}>
				<h3>{ person.first_name + '\'s Direct Reports' }</h3>
				<ConsultantCardList userID={ person.id } />
			</CardText>
		);

		return (
			<Card key={person.id} style={cardStyle}>
				<CardTitle title={title} />
				{ assessmentList }
				<CardActions>
					<Link to={'/new-risk-assessment/' + person.id}>
						<RaisedButton
							label='New Risk Assessment'
							primary={true}
							icon={<AddIcon/>}
				 		/>
					</Link>
					{ toggleshowDirectReportsButton }
				</CardActions>
				{ directReportCards }
			</Card>
		);
	});

	if (!cards.length){
		cards = (
			<p>You have no direct reports.</p>
		);
	}

	return (
		<div>{ cards }</div>
	);
};

import React from 'react';
import { RaisedButton, Card, CardTitle, CardText, CardActions } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import Collapse from 'react-collapse';

import { browserHistory } from 'react-router';
import moment from 'moment';
import ConsultantCardList from './container';

const formatDate = date => moment(date).format('MMM Do YYYY');

export default ({directReports, showingDirectReports, toggleshowDirectReports, riskColors}) => {

	var cards = directReports.map(person => {

		var assessmentList = person.assessments.length && (
			<CardText style={{maxHeight: 200, overflowY: 'auto'}}>{
				person.assessments.map(assessment => (
					<div key={assessment.id}>
						<strong>{ 'Assessment' + (assessment.assessedBy ? ' by ' + assessment.assessedBy : '') + ' on ' + formatDate(assessment.date_added) }</strong>
						<div style={{marginLeft: 15}}>
							{
								assessment.riskDimensions.filter(r => r.rating).map(riskDimension => (
									<div key={riskDimension.id}>
										<span style={{color: riskColors[riskDimension.rating.rating]}}>
											{riskDimension.rating.rating}
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

		var showDirectReports = !!showingDirectReports[person.id];

		var toggleshowDirectReportsButton = person.directReports.length > 0 && (
			<RaisedButton
				label={(showDirectReports ? 'Hide' : 'Show') + ' Direct Reports'}
				onTouchTap={() => toggleshowDirectReports(person.id)}
			/>
		);

		var directReportCards = person.directReports.length > 0 ? (
			<CardText style={{marginLeft: 20}}>
				<h3>{ person.first_name + '\'s Direct Reports' }</h3>
				<ConsultantCardList userID={ person.id } />
			</CardText>
		) : '';

		return (
			<Card key={person.id} style={{marginBottom: 20}}>
				<CardTitle title={title} />
				{ assessmentList }
				<CardActions>
					<RaisedButton
						label='New Risk Assessment'
						primary={true}
						icon={<AddIcon/>}
						onTouchTap={() => browserHistory.push('/new-risk-assessment/' + person.id)}
					/>
					{ toggleshowDirectReportsButton }
				</CardActions>
				<Collapse isOpened={showDirectReports} keepCollapsedContent={true}>
					{ directReportCards }
				</Collapse>
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

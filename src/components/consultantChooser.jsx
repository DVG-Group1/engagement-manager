import React from 'react';
import { RaisedButton, Card, CardTitle, CardText, CardActions } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import moment from 'moment';
import { riskColors } from '../config';
// import RiskGraph from './riskGraph';

const cardStyle = {marginBottom: 20};
const formatDate = date => moment(date).format('MMM Do YYYY');

const ConsultantCardList = connect(
	(state, ownProps) => ({
		people: state.people,
		userID: ownProps.userID || state.userID,
		assessments: state.riskAssessments,
		riskDimensions: state.riskDimensions,
		ratings: state.riskRatings,
		showingDirectReports: state.showingDirectReports
	}),
	dispatch => ({
		toggleshowDirectReports: userID => dispatch({type: 'TOGGLE_SHOW_DIRECT_REPORTS', userID})
	})
)(props => {

	var cards = props.people

	// just the people that report to the current user
	.filter(
		p => p.last_name && (p.manager_id === props.userID)
	)

	// find the assessments for each of the people and the date they were last assessed
	.map(person => {
		var assessments = props.assessments.filter(a => a.assessee === person.id).map(assessment => ({
			riskDimensions: props.riskDimensions.map(riskDimension => ({
				rating: props.ratings.find(
					r => r.risk_assessment_id === assessment.id && r.risk_dimension_id === riskDimension.id
				),
				...riskDimension
			})),
			...assessment
		}));

		var riskLevel;
		if (assessments[0]){
			riskLevel = Math.max.apply(null, assessments[0].riskDimensions.map(d => d.rating ? d.rating.rating : 0));
		};

		return {
			assessments,
			lastAssessed: assessments[0] ? Date.parse(assessments[0].date_added) : 0,
			riskLevel,
			directReports: props.people.filter(p => p.last_name && (p.manager_id === person.id)),
			...person
		};
	})

	// sort people so the least recently assessed are at the top
	.sort((a, b) => {
		return a.lastAssessed - b.lastAssessed;
	}).map(person => {

		var assessmentList = person.assessments.length && (
			<CardText style={{maxHeight: 300, overflowY: 'auto'}}>{
				person.assessments.map(assessment => (
					<div key={assessment.id}>
						<strong>Assessent on { formatDate(assessment.date_added) }</strong>
						<div style={{marginLeft: 15}}>{
							assessment.riskDimensions.filter(r => r.rating).map(riskDimension => {
								var rating = riskDimension.rating.rating;
								return (
									<div key={riskDimension.id} style={{color: rating >= 3 ? riskColors[rating] : 'black'}}>{
										(rating + 1) + ': ' + riskDimension.name
									}</div>
								);
							})
						}</div>
					</div>
				))
			}</CardText>
		);

		//<RiskGraph assessments={person.assessments}/>

		var title = (
			<span style={{ color: person.riskLevel >= 3 ? riskColors[person.riskLevel] : 'black' }}>{
				person.first_name + ' ' + person.last_name + (
					person.riskLevel >= 3 ? ' - ' +
						(person.riskLevel === 3 ? 'At Risk' : 'High Risk')
					: ''
				)
			}</span>
		);

		var showingDirectReports = props.showingDirectReports[person.id];

		var toggleshowDirectReportsButton = person.directReports.length > 0 && (
			<RaisedButton
				label={(showingDirectReports ? 'Hide' : 'Show') + ' Direct Reports'}
				onTouchTap={() => props.toggleshowDirectReports(person.id)}
			/>
		);

		var directReportCards = person.directReports.length > 0 && showingDirectReports && (
			<CardText>
				<h3>{ person.first_name + '\'s Direct Reports' }</h3>
				<ConsultantCardList userID={ person.id } />
			</CardText>
		);

		return (
			<Card key={person.id} style={cardStyle}>
				<CardTitle title={title} />
				{ assessmentList }
				<CardActions>
					<RaisedButton
						label='New Risk Assessment'
						href={'#/new-risk-assessment/' + person.id}
						primary={true}
						icon={<AddIcon/>}
			 		/>
					{ toggleshowDirectReportsButton }
				</CardActions>
				{ directReportCards }
			</Card>
		);
	});

	// <Tabs value={props.chooseConsultantFilter} onChange={props.setConsultantFilter}>
	// 	<Tab label="Direct Reports" value="direct"/>
	// 	<Tab label="All Reports" value="all"/>
	// </Tabs>

	return (
		<div>
			{ cards }
		</div>
	);
});

export default ConsultantCardList;

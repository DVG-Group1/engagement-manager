import React from 'react';
import { RaisedButton, Card, CardTitle, CardText, CardActions } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { riskColors } from '../config';
// import RiskGraph from './riskGraph';

const cardStyle = {marginBottom: 20};
const formatDate = date => moment(date).format('MMM Do YYYY');

const ConsultantCardList = ({directReports, showingDirectReports, toggleshowDirectReports}) => {

	var cards = directReports.map(person => {

		var assessmentList = person.assessments.length && (
			<CardText style={{maxHeight: 300, overflowY: 'auto'}}>{
				person.assessments.map(assessment => (
					<div key={assessment.id}>
						<strong>Assessent on { formatDate(assessment.date_added) }</strong>
						<div style={{marginLeft: 15}}>{
							assessment.riskDimensions.filter(r => r.rating).map(riskDimension => (
								<div key={riskDimension.id}>
									<span style={{color: riskColors[riskDimension.rating.rating]}}>
										{riskDimension.rating.rating + 1}
									</span>
									{ ': ' + riskDimension.name }
								</div>
							))
						}</div>
					</div>
				))
			}</CardText>
		);

		//<RiskGraph assessments={person.assessments}/>

		var title = (
			<span style={{ color: person.color }}>{ person.label }</span>
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

export default connect(
	(state, ownProps) => {
		var userID = ownProps.userID || state.userID;

		var directReports = state.data.people.filter(
			p => p.last_name && (p.manager_id === userID)
		)

		// find the assessments for each of the people and the date they were last assessed
		.map(person => {
			var assessments = state.data.riskAssessments.filter(a => a.assessee === person.id).map(assessment => ({
				riskDimensions: state.data.riskDimensions.map(riskDimension => ({
					rating: state.data.riskRatings.find(
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
				label: person.first_name + ' ' + person.last_name + (
					person.riskLevel >= 3 ? ' - ' + (person.riskLevel === 3 ? 'At Risk' : 'High Risk') : ''
				),
				color: person.riskLevel >= 3 ? riskColors[person.riskLevel] : 'black',
				assessments,
				lastAssessed: assessments[0] ? Date.parse(assessments[0].date_added) : 0,
				riskLevel,
				directReports: state.data.people.filter(p => p.last_name && (p.manager_id === person.id)),
				...person
			};
		})

		// sort people so the least recently assessed are at the top
		.sort((a, b) => {
			return a.lastAssessed - b.lastAssessed;
		});

		return {
			userID: ownProps.userID || state.userID,
			showingDirectReports: state.directReportVisibility,
			directReports
		};
	},
	dispatch => ({
		toggleshowDirectReports: userID => dispatch({type: 'TOGGLE_SHOW_DIRECT_REPORTS', userID})
	})
)(ConsultantCardList);

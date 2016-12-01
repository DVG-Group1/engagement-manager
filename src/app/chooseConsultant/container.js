import { connect } from 'react-redux';
import { riskColors } from '../../config';
import presentation from './presentation';

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
			directReports,
			riskColors
		};
	},
	dispatch => ({
		toggleshowDirectReports: userID => dispatch({type: 'TOGGLE_SHOW_DIRECT_REPORTS', userID})
	})
)(presentation);

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
			var assessments = state.data.riskAssessments.filter(a => a.assessee_id === person.id).map(assessment => {
				var assessedBy;
				if (assessment.assesser_id !== state.userID){
					var assesser_id = state.data.people.find(p => p.id === assessment.assesser_id);
					if (assesser_id) assessedBy = assesser_id.first_name + ' ' + assesser_id.last_name;
				}
				
				return {
					riskDimensions: state.data.riskDimensions.map(riskDimension => ({
						rating: state.data.riskRatings.find(
							r => r.risk_assessment_id === assessment.id && r.risk_dimension_id === riskDimension.id
						),
						...riskDimension
					})),
					assessedBy,
					...assessment
				};
			});

			var mostRecentAssessment = assessments[0];

			var riskLevel;
			if (mostRecentAssessment){
				riskLevel = Math.max.apply(null, mostRecentAssessment.riskDimensions.map(d => d.rating ? d.rating.rating : 0));
			};

			return {
				label: person.first_name + ' ' + person.last_name + (
					riskLevel >= 3 ? ' - ' + (riskLevel === 3 ? 'At Risk' : 'High Risk') : ''
				),
				assessments,
				lastAssessed: mostRecentAssessment ? Date.parse(mostRecentAssessment.date_added) : 0,
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

export const riskColors = ['#009E03', '#7FAD00', '#DECF00', '#D4A200', '#B50000'];

export const relationships = {
	'people.manager_id': 'people',
	'risk_assessments.assesser': 'people',
	'risk_assessments.assessee': 'people',
	'risk_dimension_options.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_assessment_id': 'risk_assessments'
};

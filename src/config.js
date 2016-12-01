export const riskColors = ['#009E03', '#7FAD00', '#DECF00', '#D4A200', '#B50000'];

export const relationships = {
	'people.manager_id': 'people',
	'risk_assessments.assesser': 'people',
	'risk_assessments.assessee': 'people',
	'risk_dimension_options.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_assessment_id': 'risk_assessments'
};

export const displayNameFuncs = {
	people: r => r && r.first_name ? r.first_name + ' ' + r.last_name : '',
	risk_dimensions: r => r.description,
	risk_assessments: (r, tables) => `${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assesser))}'s assessment of ${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assessee))} on ${r.date_added}`
};

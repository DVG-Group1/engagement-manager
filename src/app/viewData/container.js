import { connect } from 'react-redux';
import presentation from './presentation';

export const displayNameFuncs = {
	people: r => r && r.first_name ? r.first_name + ' ' + r.last_name : '',
	risk_dimensions: r => r.description,
	risk_assessments: (r, tables) => `${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assesser))}'s assessment of ${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assessee))} on ${r.date_added}`
};

export const relationships = {
	'people.manager_id': 'people',
	'risk_assessments.assesser': 'people',
	'risk_assessments.assessee': 'people',
	'risk_dimension_options.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_dimension_id': 'risk_dimensions',
	'risk_ratings.risk_assessment_id': 'risk_assessments'
};

export default connect(
	state => {
		var tables = state.viewData.tables;
		return {
			tables,
			relationships,
			displayNames: Object.keys(displayNameFuncs).reduce((res, tableName) => {
				if (tables[tableName]){
					res[tableName] = tables[tableName].rows.reduce((dex, row) => {
						dex[row.id] = displayNameFuncs[tableName](row, tables) + ' (' + row.id + ')';
						return dex;
					}, {});
				}
				return res;
			}, {})
		};
	},
	dispatch => ({
		openEditor: (editTableName, editRecord) => dispatch({type: 'OPEN_EDITOR', editTableName, editRecord})
	})
)(presentation);

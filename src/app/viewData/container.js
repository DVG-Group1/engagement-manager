import { connect } from 'react-redux';
import { relationships, displayNameFuncs } from '../../config';
import presentation from './presentation';

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

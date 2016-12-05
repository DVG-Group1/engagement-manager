import React from 'react';
import { MenuItem, FlatButton, Dialog, SelectField, DatePicker, TextField } from 'material-ui';
import { connect } from 'react-redux';
import { save } from '../../dataService';

const ValueEditor = ({editRecord, editTableName, tables, editValue, displayNames, closeEditor, saveRecord, relationships}) => {

	if (!editRecord) return null;

	var inputs = tables[editTableName].columns.filter(col => col.column_name !== 'id').map(col => {
		var key = col.column_name;
		var rel = relationships[editTableName + '.' + key];
		var inputProps = {
			value: editRecord[key],
			floatingLabelText: key,
			style: {width: '100%'}
		};

		var input;
		if (key.includes('date')){
			input = (
				<DatePicker
					onChange={(e, value) => editValue(key, value)}
					{...inputProps}
				/>
			);
		} else if (rel){
			input = (
				<SelectField
					onChange={(e, k, value) => editValue(key, value)}
					{...inputProps}
				>{
					tables[rel].rows.map(r =>
						<MenuItem key={r.id} value={r.id} primaryText={displayNames[rel][r.id]} />
					)
				}</SelectField>
			);
		} else {
			input = (
				<TextField
					onChange={e => editValue(key, e.target.value)}
					{...inputProps}
				/>
			);
		}

		return (
			<div key={key}>
				{input}
			</div>
		);
	});
	return (
		<Dialog
			title="Edit"
			actions={[
				<FlatButton
					label="Cancel"
					onTouchTap={closeEditor}
				/>,
				<FlatButton
					label="Save"
					primary={true}
					onTouchTap={() => saveRecord(editTableName)}
				/>
			]}
			modal={true}
			open={true}
			onRequestClose={closeEditor}
			autoScrollBodyContent={true}
		>
			{inputs}
		</Dialog>
	);
};

export default connect(
	(state, ownProps) => ({
		tables: state.viewData.tables,
		editRecord: state.viewData.editRecord,
		editTableName: state.viewData.editTableName,
		displayNames: ownProps.displayNames,
		relationships: ownProps.relationships
	}),
	dispatch => ({
		editValue: (key, value) => dispatch({type: 'EDIT_VALUE', key, value}),
		closeEditor: () => dispatch({type: 'CLOSE_EDITOR'}),
		saveRecord: editTableName => dispatch(save('saveRecord/' + editTableName, state => state.viewData.editRecord, 'LOAD_ALL_DATA'))
	})
)(ValueEditor);

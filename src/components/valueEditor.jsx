import React from 'react';
import { MenuItem, FlatButton, Dialog, SelectField, DatePicker, TextField } from 'material-ui';
import { connect } from 'react-redux';
import { relationships } from '../config';
import request from './../dataService';

export default connect(
	(state, ownProps) => ({
		tables: state.allTables,
		editRecord: state.editRecord,
		displayNames: ownProps.displayNames
	}),
	dispatch => ({
		editValue: (key, value) => dispatch({type: 'EDIT_VALUE', key, value}),
		closeEditor: () => dispatch({type: 'CLOSE_EDITOR'}),
		saveRecord: () => dispatch((dispatch, getState) => {
			var state = getState();
			dispatch({type: 'LOADING'});
			request('saveRecord', state.editRecord).then(data => {
				dispatch({type: 'LOAD_ALL_DATA', data});
			}).catch(error => {
				console.error(error);
				dispatch({type: 'SET_ERROR', error});
			});
		})
	})
)(props => {

	if (!props.editRecord) return null;

	var table = props.tables[props.editRecord.editTableName];
	var keys = table.columns.map(c => c.column_name);

	var inputs = keys.filter(key => key !== 'id').map(key => {
		var rel = relationships[props.editRecord.editTableName + '.' + key];
		var inputProps = {
			value: props.editRecord[key],
			floatingLabelText: key,
			style: {width: '100%'}
		};

		var input;
		if (key.includes('date')){
			input = (
				<DatePicker
					onChange={(e, value) => props.editValue(key, value)}
					{...inputProps}
				/>
			);
		} else if (rel){
			input = (
				<SelectField
					onChange={(e, k, value) => props.editValue(key, value)}
					{...inputProps}
				>{
					props.tables[rel].rows.map(r =>
						<MenuItem key={r.id} value={r.id} primaryText={props.displayNames[rel][r.id]} />
					)
				}</SelectField>
			);
		} else {
			input = (
				<TextField
					onChange={e => props.editValue(key, e.target.value)}
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
					onTouchTap={props.closeEditor}
				/>,
				<FlatButton
					label="Save"
					primary={true}
					onTouchTap={props.saveRecord}
				/>
			]}
			modal={true}
			open={true}
			onRequestClose={props.closeEditor}
		>
			{inputs}
		</Dialog>
	);
});

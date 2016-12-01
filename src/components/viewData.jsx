import React from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody, Card, CardText, CardTitle } from 'material-ui';
import { connect } from 'react-redux';
import { relationships } from '../config';
import Editor from './valueEditor';

var displayNameFuncs = {
	people: r => r && r.first_name ? r.first_name + ' ' + r.last_name : '',
	risk_dimensions: r => r.description,
	risk_assessments: (r, tables) => `${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assesser))}'s assessment of ${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assessee))} on ${r.date_added}`
};

var TableCard = ({tableName, table, rowClick, displayNames}) => (
	<Card style={{marginBottom: 20}}>
		<CardTitle title={tableName}/>
		<CardText>
			<Table
				height='300px'
				onCellClick={rowClick}
			>
				<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}
					enableSelectAll={false}
				>
					<TableRow>{
						table.columns.map(col => (
							<TableHeaderColumn key={col.column_name}>{ col.column_name }</TableHeaderColumn>
						))
					}</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={false}
					showRowHover={true}
					style={{cursor: 'pointer'}}
				>{

					table.rows.map(row => (
						<TableRow key={row.id}>{
							table.columns.map(c => {
								var col = c.column_name;
								var rel = relationships[tableName + '.' + col];
								var val = rel ? displayNames[rel][row[col]] : row[col];
								return (
									<TableRowColumn key={col}>{ val }</TableRowColumn>
								);
							})
						}</TableRow>
					))

				}</TableBody>
			</Table>
		</CardText>
	</Card>
);

var viewData = ({tables, displayNames, openEditor}) => (
	<div>
		{
			Object.keys(tables).map(tableName => (
				<TableCard
					key={tableName}
					tableName={tableName}
					table={tables[tableName]}
					displayNames={displayNames}
					rowClick={rowNum => openEditor(tableName, tables[tableName].rows[rowNum])}
				/>
			))
		}
		<Editor displayNames={displayNames}/>
	</div>
);

export default connect(
	state => {
		var tables = state.viewData.tables;
		return {
			tables,
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
)(viewData);

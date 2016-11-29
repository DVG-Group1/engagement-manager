import React from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody, Card, CardText, CardTitle } from 'material-ui';
import request from './../dataService';
import { connect } from 'react-redux';
import { relationships } from '../config';
import Editor from './valueEditor';

var displayNameFuncs = {
	people: r => r && r.first_name ? r.first_name + ' ' + r.last_name : '',
	risk_dimensions: r => r.description,
	risk_assessments: (r, tables) => `${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assesser))}'s assessment of ${displayNameFuncs.people(tables.people.rows.find(p => p.id === r.assessee))} on ${r.date_added}`
};

export default connect(
	state => ({
		tables: state.allTables
	}),
	dispatch => {
		dispatch({type: 'LOADING'});

		request('allData').then(data => {
			dispatch({type: 'LOAD_ALL_DATA', data});
		}).catch(error => {
			console.error(error);
			dispatch({type: 'SET_ERROR', error});
		});

		return {
			openEditor: (editTableName, editRecord) => dispatch({type: 'OPEN_EDITOR', editTableName, editRecord}),
			closeEditor: () => dispatch({type: 'CLOSE_EDITOR'})
		};
	}
)(props => {


	var displayNames = Object.keys(displayNameFuncs).reduce((res, tableName) => {
		if (props.tables[tableName]){
			res[tableName] = props.tables[tableName].rows.reduce((dex, row) => {
				dex[row.id] = displayNameFuncs[tableName](row, props.tables) + ' (' + row.id + ')';
				return dex;
			}, {});
		}
		return res;
	}, {});

	// export const getDisplayName = (tableName, row, tables) => {
	// 	return row ? displayNames[tableName](row, tables) + ' (' + row.id + ')' : null;
	// };

	var cards = Object.keys(props.tables).map(tableName => {
		var table = props.tables[tableName];
		var keys = table.columns.map(c => c.column_name);

		return (
			<Card key={tableName} style={{marginBottom: 20}}>
				<CardTitle title={tableName}/>
				<CardText>
					<Table
						height={'300px'}
						onCellClick={(rowNum) => props.openEditor(tableName, table.rows[rowNum])}
					>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}
							enableSelectAll={false}
						>
							<TableRow>{
								keys.map(col => <TableHeaderColumn key={col}>{ col }</TableHeaderColumn>)
							}</TableRow>
						</TableHeader>
						<TableBody
							displayRowCheckbox={false}
							showRowHover={true}
							style={{cursor: 'pointer'}}
						>{
							table.rows.map((row, i) => (
								<TableRow key={i}>{
									keys.map(col => {
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
	});

	return (
		<div>
			{ cards }
			<Editor displayNames={displayNames}/>
		</div>
	);
});

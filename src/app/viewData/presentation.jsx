import React from 'react';
import Editor from './valueEditor';
import { FloatingActionButton, Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

export default ({tables, displayNames, openEditor, relationships, tableName, addRow}) => {

	if (!tables[tableName]){
		return (
			<div>"{tableName}" is invalid.</div>
		);
	}

	return (
		<div>
			<Table
				onCellClick={rowNum => openEditor(tableName, tables[tableName].rows[rowNum])}
			>
				<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}
					enableSelectAll={false}
				>
					<TableRow>{
						tables[tableName].columns.map(col => (
							<TableHeaderColumn key={col.column_name}>{ col.column_name }</TableHeaderColumn>
						))
					}</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={false}
					showRowHover={true}
					style={{cursor: 'pointer'}}
				>{

					tables[tableName].rows.map(row => (
						<TableRow key={row.id}>{
							tables[tableName].columns.map(c => {
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

			<FloatingActionButton
				style={{cursor: 'pointer', position: 'fixed', bottom: 20, right: 20}}
				onTouchTap={() => openEditor(tableName, {})}
			>
				<AddIcon/>
			</FloatingActionButton>

			<Editor
				displayNames={displayNames}
				relationships={relationships}
			/>
		</div>
	);
};

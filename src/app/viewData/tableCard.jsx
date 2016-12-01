import React from 'react';
import { Table, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableBody, Card, CardText, CardTitle } from 'material-ui';

export default ({tableName, table, rowClick, displayNames, relationships}) => (
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

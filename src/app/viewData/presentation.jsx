import React from 'react';
import Editor from './valueEditor';
import TableCard from './tableCard';

export default ({tables, displayNames, openEditor, relationships}) => (
	<div>
		{
			Object.keys(tables).map(tableName => (
				<TableCard
					key={tableName}
					tableName={tableName}
					table={tables[tableName]}
					displayNames={displayNames}
					relationships={relationships}
					rowClick={rowNum => openEditor(tableName, tables[tableName].rows[rowNum])}
				/>
			))
		}
		<Editor displayNames={displayNames}/>
	</div>
);

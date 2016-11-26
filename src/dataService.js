// const convertTypes = tables => {
// 	Object.keys(tables).forEach(tableName => {
// 		Object.keys(tables[tableName][0] || {}).filter(col => col.includes('date')).forEach(col => {
// 			tables[tableName].forEach(row => {
// 				row[col] = new Date(row[col]);
// 			});
// 		});
// 	});
// 	return tables;
// };

const request = (path, data) => {
	if (data){
		data = {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'})
		};
	}
	return fetch(`http://localhost:3001/${path}`, data).then(r => r.json());
};

export default request;

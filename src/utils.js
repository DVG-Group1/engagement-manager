export const ls = (() => {
	var data = {};
	if (localStorage.persisted){
		try {
			data = JSON.parse(localStorage.persisted);
		} catch(e){
			data = {};
		}
	}
	return (key, val) => {
		if (val === undefined){
			return data[key];
		} else if (val !== data[key]) {
			data[key] = val;
			localStorage.persisted = JSON.stringify(data);
		}
	};
})();

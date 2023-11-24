export const isNotAllCitiesInList = (path) => {
	let boolList = [];
	for (let i = 0; i < city.length; i++) {
		boolList.push(path.includes(city[i].name));
	}
	return boolList.includes(false);
};

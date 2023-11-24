import { clear } from 'console';
import { openFile } from '../utils/openFile.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const mbaFiles = ['matriz_latitude_mba', 'matriz_longitude_mba'];
const wedFiles = ['matriz_latitude_wed', 'matriz_longitude_wed'];
const densityFiles = ['arrayModamba', 'arrayModawed'];
const basePath = '/Users/cyroMBlabs/Documents/modaGelo/';

let lonMapData = [];
let latMapData = [];
const densMapData = [];
const maxLat = -61.51346;
const minLat = -65.73394;
const maxLon = -56.30352;
const minLon = -60.27134;
const maxDensity = 2.5;
const precision = 1;

export const processData = async (latitudeFile, longitudeFile, densityFile) => {
	const latitudeData = await openFile(`${basePath}${latitudeFile}.dat`);
	const longitudeData = await openFile(`${basePath}${longitudeFile}.dat`);
	const densityData = await openFile(`${basePath}${densityFile}.dat`);

	let latitudeArray = latitudeData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => line.split(/\s+/).map(Number));

	let longitudeArray = longitudeData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => line.split(/\s+/).map(Number));

	const clearArray = (size) => {
		for (var i = 0; i < size; i++) {
			longitudeArray[i] = longitudeArray[i].map((number) =>
				Number(number.toFixed(precision))
			);
			latitudeArray[i] = latitudeArray[i].map((number) =>
				Number(number.toFixed(precision))
			);
		}
	};

	clearArray(longitudeArray.length); // Retirando valores invalidos dos array

	const densityArray = densityData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => {
			const values = line.split(/\s+/);
			return values.slice(1).map(Number);
		});

	const normalizeArrayToThisRegion = () => {
		for (var i = 0; i < densityArray.length; i++) {
			for (var j = 0; j < densityArray[i].length; j++) {
				if (isNaN(densityArray[i][j])) {
					densityArray[i][j] = 0;
				}
			}
		}
	};

	normalizeArrayToThisRegion();

	for (let i = 0; i < latitudeArray.length; i++) {
		for (let j = 0; j < latitudeArray[i].length; j++) {
			const lat = latitudeArray[i][j];
			const lon = longitudeArray[i][j];
			const density = densityArray[i][j];

			densMapData.push({
				density: density,
				lat: lat,
				lon: lon,
			});

			if (!isNaN(lat) && !isNaN(lon)) {
				lonMapData.push(lon);
				latMapData.push(lat);
			}
		}
	}

	const matrix2D = [];
	lonMapData = lonMapData
		.filter((lon) => lon <= maxLon && lon >= minLon)
		.filter((valor, indice, array) => {
			return array.indexOf(valor) === indice;
		});
	latMapData = latMapData
		.filter((lat) => lat <= maxLat && lat >= minLat)
		.filter((valor, indice, array) => {
			return array.indexOf(valor) === indice;
		});

	for (let i = 0; i < lonMapData.length; i++) {
		for (let j = 0; j < latMapData.length; j++) {
			matrix2D.push([lonMapData[i], latMapData[j]]);
		}
	}

	return matrix2D;
};

const mbaResultArray = await processData(
	mbaFiles[0],
	mbaFiles[1],
	densityFiles[0]
);
const wedResultArray = await processData(
	wedFiles[0],
	wedFiles[1],
	densityFiles[1]
);
const result = [...mbaResultArray, ...wedResultArray];
const maps = result.sort((a, b) => b[0] - a[0]);

const mapMatrix = [];
for (let i = 0; i < maps.length; i += 3) {
	mapMatrix.push([maps[i], maps[i + 1], maps[i + 2]]);
}

// Criar objetos para cada ponto
let points = mapMatrix.flatMap((group) =>
	group.map((coords) => {
		if (coords) {
			const densityMapItem = densMapData.find(
				(item) => item.lon === coords[0] && item.lat === coords[1]
			);
			return {
				name: uuidv4(),
				x: coords[0],
				y: coords[1],
				connections: [],
				density: densityMapItem.density,
			};
		}
	})
);

for (let j = 0; j < mapMatrix.length; j++) {
	for (let i = 0; i < mapMatrix[j].length; i++) {
		let actualPoint = mapMatrix[j][i];
		let leftPoint;
		let rightPoint;
		let topPoint;
		let bottomPoint;
		let leftDiagSup;
		let leftDiagInf;
		let rightDiagInf;
		let rightDiagSup;

		const actualPointIndex = actualPoint
			? points.findIndex(
					(point) => point.x === actualPoint[0] && point.y === actualPoint[1]
			  )
			: -1;

		const actualPointFormat = points[actualPointIndex];

		if (i > 0) {
			leftPoint = mapMatrix[j][i - 1];

			if (leftPoint && actualPoint && actualPointFormat.density <= maxDensity) {
				const index = points.findIndex(
					(point) => point.x === leftPoint[0] && point.y === leftPoint[1]
				);

				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (i < mapMatrix[j].length) {
			rightPoint = mapMatrix[j][i + 1];
			if (
				rightPoint &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === rightPoint[0] && point.y === rightPoint[1]
				);

				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (j > 0) {
			topPoint = mapMatrix[j - 1][i];
			if (topPoint && actualPoint && actualPointFormat.density <= maxDensity) {
				const index = points.findIndex(
					(point) => point.x === topPoint[0] && point.y === topPoint[1]
				);

				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (j < mapMatrix.length - 1) {
			bottomPoint = mapMatrix[j + 1][i];
			if (
				bottomPoint &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === bottomPoint[0] && point.y === bottomPoint[1]
				);
				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (j > 0 && i > 0) {
			leftDiagSup = mapMatrix[j - 1][i - 1];
			if (
				leftDiagSup &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === leftDiagSup[0] && point.y === leftDiagSup[1]
				);
				points[index].connections.push({ name: points[index].name, weight: 0 });
			}
		}
		if (j > 0 && i < mapMatrix[j].length - 1) {
			rightDiagSup = mapMatrix[j - 1][i + 1];
			if (
				rightDiagSup &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === rightDiagSup[0] && point.y === rightDiagSup[1]
				);
				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (j < mapMatrix.length - 1 && i < mapMatrix[j].length - 1) {
			rightDiagInf = mapMatrix[j + 1][i + 1];
			if (
				rightDiagInf &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === rightDiagInf[0] && point.y === rightDiagInf[1]
				);
				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
		if (j < mapMatrix.length - 1 && i > 0) {
			leftDiagInf = mapMatrix[j + 1][i - 1];
			if (
				bottomPoint &&
				actualPoint &&
				actualPointFormat.density <= maxDensity
			) {
				const index = points.findIndex(
					(point) => point.x === leftDiagInf[0] && point.y === leftDiagInf[1]
				);
				points[actualPointIndex].connections.push({
					name: points[index].name,
					weight: 0,
				});
			}
		}
	}
}
points = points.filter((point) => point && point.density <= maxDensity);

// limpando conexões com pontos inválidos
for (let i = 0; i < points.length; i++) {
	points[i].connections = points[i].connections.filter(
		(connect) =>
			Boolean(points.filter((point) => point.name === connect.name).length) &&
			connect.name != points[i].name
	);
}

const filteredPoints = points.filter((point, index, self) => {
	const hasDuplicate =
		self.findIndex((p) => p.x === point.x && p.y === point.y) === index;
	const hasConnections = point.connections.length > 0;

	return hasDuplicate && hasConnections;
});

const filtredMaps = [];
const filtredMapMatrix = [];
const lonFiltred = filteredPoints.map((point) => point.x);
const latFiltred = filteredPoints.map((point) => point.y);
for (let i = 0; i < lonFiltred.length; i++) {
	filtredMaps.push([lonFiltred[i], latFiltred[i]]);
}

for (let i = 0; i < filtredMaps.length - 1; i += 3) {
	filtredMapMatrix.push([
		filtredMaps[i],
		filtredMaps[i + 1],
		filtredMaps[i + 2],
	]);
}

// Criar objeto filtrado pra cada ponto

let filterPoints = filtredMapMatrix.flatMap((group) =>
	group.map((coords) => {
		if (coords) {
			const densityMapItem = densMapData.find(
				(item) => item.lon === coords[0] && item.lat === coords[1]
			);

			return {
				name: points.find(
					(item) => item.x === coords[0] && item.y === coords[1]
				).name,
				x: coords[0],
				y: coords[1],
				connections: [],
				density: densityMapItem.density,
			};
		}
	})
);

// construção das conexões
for (let j = 0; j < filtredMapMatrix.length; j++) {
	for (let i = 0; i < filtredMapMatrix[j].length; i++) {
		let actualPoint = filtredMapMatrix[j][i];
		let leftPoint;
		let rightPoint;
		let topPoint;
		let bottomPoint;
		let leftDiagSup;
		let leftDiagInf;
		let rightDiagInf;
		let rightDiagSup;

		const actualPointIndex = actualPoint
			? filterPoints.findIndex(
					(point) => point.x === actualPoint[0] && point.y === actualPoint[1]
			  )
			: -1;

		if (i > 0) {
			leftPoint = filtredMapMatrix[j][i - 1];

			if (leftPoint && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === leftPoint[0] && point.y === leftPoint[1]
				);

				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (i < filtredMapMatrix[j].length) {
			rightPoint = filtredMapMatrix[j][i + 1];
			if (i == 0 && j == 0) {
				console.log('here', i, j);
				console.log('right', rightPoint);
			}
			if (rightPoint && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === rightPoint[0] && point.y === rightPoint[1]
				);

				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (j > 0) {
			topPoint = filtredMapMatrix[j - 1][i];
			if (i == 0 && j == 0) {
				console.log('here', i, j);
				console.log('top', topPoint);
			}
			if (topPoint && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === topPoint[0] && point.y === topPoint[1]
				);

				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (j < filtredMapMatrix.length - 1) {
			bottomPoint = filtredMapMatrix[j + 1][i];

			if (bottomPoint && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === bottomPoint[0] && point.y === bottomPoint[1]
				);

				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
				if (i == 0 && j == 0) {
					console.log(filterPoints[0]);
				}
			}
		}
		if (j > 0 && i > 0) {
			leftDiagSup = filtredMapMatrix[j - 1][i - 1];
			if (leftDiagSup && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === leftDiagSup[0] && point.y === leftDiagSup[1]
				);
				filterPoints[index].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (j > 0 && i < filtredMapMatrix[j].length - 1) {
			rightDiagSup = filtredMapMatrix[j - 1][i + 1];
			if (rightDiagSup && actualPoint) {
				const index = points.findIndex(
					(point) => point.x === rightDiagSup[0] && point.y === rightDiagSup[1]
				);
				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (j < filtredMapMatrix.length - 1 && i < filtredMapMatrix[j].length - 1) {
			rightDiagInf = filtredMapMatrix[j + 1][i + 1];
			if (rightDiagInf && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === rightDiagInf[0] && point.y === rightDiagInf[1]
				);
				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
		if (j < filtredMapMatrix.length - 1 && i > 0) {
			leftDiagInf = filtredMapMatrix[j + 1][i - 1];
			if (bottomPoint && actualPoint) {
				const index = filterPoints.findIndex(
					(point) => point.x === leftDiagInf[0] && point.y === leftDiagInf[1]
				);
				filterPoints[actualPointIndex].connections.push({
					name: filterPoints[index].name,
					weight: 0,
				});
			}
		}
	}
}
// filtrando conexão inválida
for (let i = 0; i < filterPoints.length; i++) {
	filterPoints[i].connections = filterPoints[i].connections.filter(
		(connect) => connect.name != filterPoints[i].name
	);
}

const filePath = './Process/cityData.json';
const jsonData = JSON.stringify(filterPoints, null, 2);
fs.writeFileSync(filePath, jsonData);
console.log('Arquivo JSON criado com sucesso:', filePath);

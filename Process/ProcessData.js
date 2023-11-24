import { openFile } from '../utils/openFile.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const mbaFiles = ['matriz_latitude_mba', 'matriz_longitude_mba'];
const wedFiles = ['matriz_latitude_wed', 'matriz_longitude_wed'];
const densityFiles = ['arrayModawed', 'arrayModamba'];
const basePath = '/Users/cyroMBlabs/Documents/modaGelo/';

let lonMapData = [];
let latMapData = [];
const densMapData = [];
const maxLat = -61.51346;
const minLat = -65.73394;
const maxLon = -56.30352;
const minLon = -60.27134;

export const processData = async (latitudeFile, longitudeFile, densityFile) => {
	const latitudeData = await openFile(`${basePath}${latitudeFile}.dat`);
	const longitudeData = await openFile(`${basePath}${longitudeFile}.dat`);
	const densityData = await openFile(`${basePath}${densityFile}.dat`);

	const latitudeArray = latitudeData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => line.split(/\s+/).map(Number));

	const longitudeArray = longitudeData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => line.split(/\s+/).map(Number));

	const densityArray = densityData
		.split('\n')
		.filter((line) => line.trim() !== '')
		.map((line) => {
			const values = line.split(/\s+/);
			return values.slice(1).map(Number);
		});

	for (let i = 0; i < latitudeArray.length; i++) {
		for (let j = 0; j < latitudeArray[i].length; j++) {
			const lat = latitudeArray[i][j];
			const lon = longitudeArray[i][j];

			if (!isNaN(lat) && !isNaN(lon)) {
				lonMapData.push(lon);
				latMapData.push(lat);
			}
		}
	}

	for (let k = 0; k < densityArray.length; k++) {
		for (let i = 0; i < densityArray[k].length; i++) {
			const density = densityArray[k][i];
			if (!isNaN(density)) {
				densMapData.push(density);
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

// Número de colunas desejado
const columnsPerRow = 3;
const mapMatrix = [];
for (let i = 0; i < maps.length; i += 3) {
	mapMatrix.push([maps[i], maps[i + 1], maps[i + 2]]);
}

// Criar objetos para cada ponto
const points = mapMatrix.flatMap((group) =>
	group.map((coords) => {
		if (coords) {
			return {
				name: uuidv4(),
				x: coords[0],
				y: coords[1],
				connections: [],
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
		if (i > 0) {
			leftPoint = mapMatrix[j][i - 1];
			if (leftPoint && actualPoint) {
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
			if (rightPoint && actualPoint) {
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
			if (topPoint && actualPoint) {
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
			if (bottomPoint && actualPoint) {
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
			if (leftDiagSup && actualPoint) {
				const index = points.findIndex(
					(point) => point.x === leftDiagSup[0] && point.y === leftDiagSup[1]
				);
				points[index].connections.push({ name: points[index].name, weight: 0 });
			}
		}
		if (j > 0 && i < mapMatrix[j].length - 1) {
			rightDiagSup = mapMatrix[j - 1][i + 1];
			if (rightDiagSup && actualPoint) {
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
			if (rightDiagInf && actualPoint) {
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
			if (bottomPoint && actualPoint) {
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

/*
let response = [];
for (let k = 0; k < result.length; k++) {
	for (let i = 0; i < result[k].length; i++) {
		const isValidData = Boolean(
			!isNaN(result[k][i].density) &&
				result[k][i].density <= 2.5 &&
				!isNaN(result[k][i].longitude) &&
				!isNaN(result[k][i].latitude)
		);
		if (isValidData) {
			response.push(result[k][i]);
		}
	}
}*/

const jsonData = JSON.stringify(points, null, 2);
const filePath = './Process/cityData.json';
fs.writeFileSync(filePath, jsonData);
console.log('Arquivo JSON criado com sucesso:', filePath);

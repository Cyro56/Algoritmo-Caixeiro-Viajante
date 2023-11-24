import { EuclideanDistance } from '../DataDistance/EuclideanDistance.js';
import fs from 'fs/promises';

const filePath = './Process/cityData.json';

const readCityData = async () => {
	try {
		const fileContent = await fs.readFile(filePath, 'utf-8');
		const points = JSON.parse(fileContent);
		return points;
	} catch (err) {
		console.error('Erro ao ler o arquivo:', err);
		throw err;
	}
};

const initializeCityData = async () => {
	try {
		const city = await readCityData();

		const removeSelfConnections = () => {
			city.forEach((point) => {
				point.connections = point.connections.filter(
					(connection) => connection.name !== point.name
				);
			});
		};
		// Agora que city está totalmente inicializado, calcule as distâncias
		for (let k = 0; k < city.length; k++) {
			for (let j = 0; j < city[k].connections.length; j++) {
				const connection = city.find(
					(data) => data.name === city[k].connections[j].name
				);
				city[k].connections[j].dist = EuclideanDistance(
					city[k].x,
					city[k].y,
					connection.x,
					connection.y
				);
			}
		}

		removeSelfConnections();

		return city;
	} catch (err) {
		console.error('Erro durante a inicialização:', err);
		throw err;
	}
};

// Agora, chame a função assíncrona e aguarde a inicialização de city
const initializeAndRun = async () => {
	const city = await initializeCityData();
	return city;
};

// Inicie a inicialização e execução
export const city = await initializeAndRun();

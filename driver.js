import { neuralNetwork } from './NeuralProcess/neuralNetwork.js';
import fs from 'fs';
import { Perimeter } from './DataDistance/allRoute.js';
import { city } from './DataCity/dataCity.js';
export function DriverRoute(initialPoint, finalPoint) {
	let BestTrainingPath = neuralNetwork(initialPoint, finalPoint)[1];
	let city = neuralNetwork(initialPoint, finalPoint)[0];
	let path = [initialPoint];
	let actualCity = path[path.length - 1];
	let weightParam = 1;
	let count = 0;

	while (path[path.length - 1] != finalPoint) {
		let nextCity = '';
		let minDistweight = Infinity;
		for (
			let i = 0;
			i < city.find((data) => data.name === actualCity).connections.length;
			i++
		) {
			minDistweight = Math.min(
				city.find((data) => data.name === actualCity).connections[i].dist +
					city.find((data) => data.name === actualCity).connections[i].weight,
				minDistweight
			);
		}

		nextCity = city
			.find((data) => data.name === actualCity)
			.connections.find(
				(data) => data.dist + data.weight <= minDistweight
			).name;

		path.push(nextCity);

		city
			.find((data) => data.name === actualCity)
			.connections.find((data) => data.name === nextCity).weight += weightParam;

		actualCity = nextCity;

		const finalPointErr =
			path[path.length - 1] != finalPoint && path.length > city.length * 2;

		if (finalPointErr) {
			count++;
			path = [initialPoint];
			actualCity = initialPoint;
		}
	}
	if (Perimeter(BestTrainingPath) < Perimeter(path)) {
		path = BestTrainingPath;
	}
	console.log('Distância percorrida: ' + Perimeter(path));
	console.log('Tentativas: ' + count);
	return path;
}
// show data
try {
	console.time('final result');
	const result = DriverRoute(
		'f67e3718-53db-4ab6-b118-b1a2858dd6f0',
		'9d1ee2f7-e61a-4317-acb5-4447dc6645f5'
	);
	console.timeEnd('final result');
	const responseArr = [];
	result.forEach((res) => {
		const point = city.find((local) => local.name === res);
		responseArr.push([point.x, point.y]);
	});

	const formattedResponse = `[\n${responseArr
		.map((point) => `  [${point.join(', ')}],`)
		.join('\n')}\n]`;

	fs.writeFileSync('./response.txt', formattedResponse, 'utf-8');

	console.log('Arquivo de texto gerado com sucesso!');
} catch (e) {
	console.log(e);
	console.log('Melhor resultado de treino');
	console.log('Distances Driver: ' + Perimeter(BestTrainingPath));
	console.log(BestTrainingPath);
}

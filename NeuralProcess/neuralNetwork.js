import { CalculateRoute } from '../Training/gps.js';

export function neuralNetwork(initialPoint, finalPoint) {
	console.log(initialPoint, 'Here');
	let storyData = [];
	let bestDistance = Infinity;
	let count = 0;
	let trainingNumber = 1000;

	while (count < trainingNumber) {
		count++;
		storyData.push(CalculateRoute(initialPoint, finalPoint)[0]);
		bestDistance = Math.min(
			storyData[storyData.length - 1].distance,
			bestDistance
		);
	}

	const betterGeneration = storyData.filter(
		(data) => data.distance <= bestDistance
	);

	const bestMapMind = betterGeneration[0].mapMind;

	const bestGenes = betterGeneration[0].data;

	const bestTrainingPath = betterGeneration[0].path;

	return [bestGenes, bestMapMind, bestTrainingPath];
}
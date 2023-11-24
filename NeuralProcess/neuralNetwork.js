import { CalculateRoute } from '../Training/gps.js';

export function neuralNetwork(initialPoint, finalPoint) {
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

	const bestTrainingPath = betterGeneration[0].path;

	return [bestMapMind, bestTrainingPath];
}

import { CalculateRoute } from '../Training/gps.js';

export function neuralNetwork(initialPoint, finalPoint) {
	console.log(`Init Neural Training`);
	let storyData = { distance: Infinity };
	let count = 0;
	let trainingNumber = 1000;

	while (count < trainingNumber) {
		count++;
		const result = CalculateRoute(initialPoint, finalPoint)[0];
		if (storyData.distance > result.distance) {
			storyData = result;
		}

		const greenColorCode = '\x1b[32m';

		const resetColorCode = '\x1b[0m';

		console.log(
			`${greenColorCode}training ${((count * 100) / trainingNumber).toFixed(
				2
			)} % ...${resetColorCode}`
		);
	}

	const betterGeneration = storyData;

	const bestMapMind = betterGeneration.mapMind;

	const bestTrainingPath = betterGeneration.path;

	return [bestMapMind, bestTrainingPath];
}

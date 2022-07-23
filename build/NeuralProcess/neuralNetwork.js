"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.neuralNetwork = void 0;
const gps_1 = require("../Training/gps");
function neuralNetwork() {
    let storyData = [];
    let bestDistance = Infinity;
    let count = 0;
    let trainingNumber = 1000;
    while (count < trainingNumber) {
        count++;
        storyData.push((0, gps_1.CalculateRoute)("F", "F")[0]);
        bestDistance = Math.min(storyData[storyData.length - 1].distance, bestDistance);
    }
    const betterGeneration = storyData.filter((data) => data.distance <= bestDistance);
    const bestMapMind = betterGeneration[0].mapMind;
    const bestGenes = betterGeneration[0].data;
    const bestTrainingPath = betterGeneration[0].path;
    return [bestGenes, bestMapMind, bestTrainingPath];
}
exports.neuralNetwork = neuralNetwork;

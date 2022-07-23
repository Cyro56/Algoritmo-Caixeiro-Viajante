"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoute = void 0;
const neuralNetwork_js_1 = require("./NeuralProcess/neuralNetwork.js");
const allRoute_js_1 = require("./DataDistance/allRoute.js");
const utils_1 = require("./utils/utils");
let BestTrainingPath = (0, neuralNetwork_js_1.neuralNetwork)()[2];
function DriverRoute() {
    let city = (0, neuralNetwork_js_1.neuralNetwork)()[1];
    let gene = (0, neuralNetwork_js_1.neuralNetwork)()[0];
    let path = [utils_1.initialPoint];
    let actualCity = path[path.length - 1];
    let weightParam = 1;
    let count = 0;
    function isNotAllCitiesInList(path) {
        let boolList = [];
        for (let i = 0; i < city.length; i++) {
            boolList.push(path.includes(city[i].name));
        }
        return boolList.includes(false);
    }
    while (isNotAllCitiesInList(path) || path[path.length - 1] != utils_1.finalPoint) {
        let nextCity = "";
        let minDistweight = Infinity;
        for (let i = 0; i < city.find((data) => data.name === actualCity).connections.length; i++) {
            minDistweight = Math.min(city.find((data) => data.name === actualCity).connections[i].dist +
                city.find((data) => data.name === actualCity).connections[i].weight, minDistweight);
        }
        nextCity = city
            .find((data) => data.name === actualCity)
            .connections.find((data) => data.dist + data.weight <= minDistweight).name;
        path.push(nextCity);
        let rate = count;
        if (rate >= gene.length) {
            rate = gene.length - 1;
        }
        let factor = (Math.random() + 9 * gene[rate]) / 10;
        city
            .find((data) => data.name === actualCity)
            .connections.find((data) => data.name === nextCity).weight +=
            weightParam * factor;
        actualCity = nextCity;
        const finalPointErr = path[path.length - 1] != utils_1.finalPoint && path.length > city.length * 2;
        if (finalPointErr) {
            count++;
            path = [utils_1.initialPoint];
            actualCity = utils_1.initialPoint;
        }
    }
    if ((0, allRoute_js_1.Perimeter)(BestTrainingPath) < (0, allRoute_js_1.Perimeter)(path)) {
        path = BestTrainingPath;
    }
    console.log("Distância percorrida: " + (0, allRoute_js_1.Perimeter)(path));
    console.log("Tentativas: " + count);
    return path;
}
exports.DriverRoute = DriverRoute;
try {
    console.log(DriverRoute(), "final result");
}
catch (e) {
    console.log(e);
    console.log("Melhor resultado de treino");
    console.log("Distances Driver: " + (0, allRoute_js_1.Perimeter)(BestTrainingPath));
    console.log(BestTrainingPath);
}

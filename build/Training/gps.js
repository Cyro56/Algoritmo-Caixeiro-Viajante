"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateRoute = void 0;
const dataCity_js_1 = require("../DataCity/dataCity.js");
const allRoute_js_1 = require("../DataDistance/allRoute.js");
const utils_1 = require("../utils/utils");
function CalculateRoute() {
    let trainingData = [
        { reCalls: 0, data: [], path: [], distance: 0, mapMind: [] },
    ];
    let path = [utils_1.initialPoint];
    let actualCity = path[path.length - 1];
    let weightParam = 1;
    let Recalculando = 0;
    function isNotAllCitiesInList(path) {
        let boolList = [];
        for (let i = 0; i < dataCity_js_1.city.length; i++) {
            boolList.push(path.includes(dataCity_js_1.city[i].name));
        }
        return boolList.includes(false);
    }
    while (isNotAllCitiesInList(path) || path[path.length - 1] != utils_1.finalPoint) {
        let nextCity = "";
        let minDistweight = Infinity;
        for (let i = 0; i < dataCity_js_1.city.find((data) => data.name === actualCity).connections.length; i++) {
            minDistweight = Math.min(dataCity_js_1.city.find((data) => data.name === actualCity).connections[i].dist +
                dataCity_js_1.city.find((data) => data.name === actualCity).connections[i].weight, minDistweight);
        }
        nextCity = dataCity_js_1.city
            .find((data) => data.name === actualCity)
            .connections.find((data) => data.dist + data.weight <= minDistweight).name;
        path.push(nextCity);
        let factor = Math.random();
        trainingData[0].data.push(factor);
        dataCity_js_1.city
            .find((data) => data.name === actualCity)
            .connections.find((data) => data.name === nextCity).weight +=
            weightParam * factor;
        actualCity = nextCity;
        const finalPointErr = path[path.length - 1] != utils_1.finalPoint && path.length > dataCity_js_1.city.length * 2;
        if (finalPointErr) {
            Recalculando++;
            path = [utils_1.initialPoint];
            actualCity = utils_1.initialPoint;
        }
    }
    trainingData[0].reCalls = Recalculando;
    trainingData[0].path = path;
    trainingData[0].distance = (0, allRoute_js_1.Perimeter)(path);
    trainingData[0].mapMind = dataCity_js_1.city;
    return trainingData;
}
exports.CalculateRoute = CalculateRoute;

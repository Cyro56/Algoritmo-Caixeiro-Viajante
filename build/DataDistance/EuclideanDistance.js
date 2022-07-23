"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuclideanDistance = void 0;
const dataCity_js_1 = require("../DataCity/dataCity.js");
function EuclideanDistance(a, b) {
    let initalCity = dataCity_js_1.city.find((data) => data.name === a);
    let nextCity = dataCity_js_1.city.find((data) => data.name === b);
    let x1 = initalCity.x;
    let y1 = initalCity.y;
    let x2 = nextCity.x;
    let y2 = nextCity.y;
    let distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2);
    return distance;
}
exports.EuclideanDistance = EuclideanDistance;

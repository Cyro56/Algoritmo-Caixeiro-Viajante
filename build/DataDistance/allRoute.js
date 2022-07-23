"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perimeter = void 0;
const dataCity_js_1 = require("../DataCity/dataCity.js");
function Perimeter(path) {
    let allDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        let cityData = dataCity_js_1.city.find((data) => data.name === path[i]);
        let connectionData = cityData.connections.find((data) => data.name === path[i + 1]);
        allDistance += connectionData.dist;
    }
    return allDistance;
}
exports.Perimeter = Perimeter;

import { city } from "../DataCity/dataCity.js";
import { Perimeter } from "../DataDistance/allRoute.js";

export function CalculateRoute(initialPoint, finalPoint) {
  let trainingData = [
    { reCalls: 0, data: [], path: [], distance: 0, mapMind: [] },
  ];
  let path = [initialPoint];
  let actualCity = path[path.length - 1];
  let weightParam = 1;
  let Recalculando = 0;

  function isNotAllCitiesInList(path) {
    let boolList = [];
    for (let i = 0; i < city.length; i++) {
      boolList.push(path.includes(city[i].name));
    }
    return boolList.includes(false);
  }

  while (isNotAllCitiesInList(path) || path[path.length - 1] != finalPoint) {
    let nextCity = "";
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
    let factor = Math.random();
    trainingData[0].data.push(factor);
    city
      .find((data) => data.name === actualCity)
      .connections.find((data) => data.name === nextCity).weight +=
      weightParam * factor;

    actualCity = nextCity;

    const finalPointErr =
      path[path.length - 1] != finalPoint && path.length > city.length * 2;

    if (finalPointErr) {
      Recalculando++;
      path = [initialPoint];
      actualCity = initialPoint;
    }
  }

  trainingData[0].reCalls = Recalculando;
  trainingData[0].path = path;
  trainingData[0].distance = Perimeter(path);
  trainingData[0].mapMind = city;
  return trainingData;
}

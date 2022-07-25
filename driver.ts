import { neuralNetwork } from "./NeuralProcess/neuralNetwork.js";
import { Perimeter } from "./DataDistance/allRoute.js";

export function DriverRoute(initialPoint: string, finalPoint: string) {
  let BestTrainingPath = neuralNetwork(initialPoint, finalPoint)[2];
  let city = neuralNetwork(initialPoint, finalPoint)[1];
  let gene = neuralNetwork(initialPoint, finalPoint)[0];
  let path: string[] = [initialPoint];
  let actualCity = path[path.length - 1];
  let weightParam = 1;
  let count = 0;

  function isNotAllCitiesInList(path: string[]) {
    let boolList: boolean[] = [];
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
  console.log("Distância percorrida: " + Perimeter(path));
  console.log("Tentativas: " + count);
  return path;
}

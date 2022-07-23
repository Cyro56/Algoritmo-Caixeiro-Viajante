import { city } from "../DataCity/dataCity.js";

export function EuclideanDistance(a, b) {
  let initalCity = city.find((data) => data.name === a);
  let nextCity = city.find((data) => data.name === b);
  let x1 = initalCity.x;
  let y1 = initalCity.y;
  let x2 = nextCity.x;
  let y2 = nextCity.y;

  let distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2);
  return distance;
}

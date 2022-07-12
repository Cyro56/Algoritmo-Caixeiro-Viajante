import { city } from "../DataCity/dataCity.js";
export function Perimeter(path) {
  let allDistance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    let cityData = city.find((data) => data.name === path[i]);
    let connectionData = cityData.connections.find(
      (data) => data.name === path[i + 1]
    );
    allDistance += connectionData.dist;
  }
  return allDistance;
}

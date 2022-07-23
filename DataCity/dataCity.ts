import { EuclideanDistance } from "../../algoritimos/GPS/DataDistance/EuclideanDistance.js";

export let city = [
  {
    name: "A",
    x: 20,
    y: 40,
    connections: [
      { name: "B", weight: 0, dist: 0 },
      { name: "C", weight: 0, dist: 0 },
      { name: "E", weight: 0, dist: 0 },
    ],
  },
  {
    name: "B",
    x: 40,
    y: 80,
    connections: [
      { name: "A", weight: 0, dist: 0 },
      { name: "D", weight: 0, dist: 0 },
      { name: "E", weight: 0, dist: 0 },
      { name: "F", weight: 0, dist: 0 },
    ],
  },
  {
    name: "C",
    x: 40,
    y: 40,
    connections: [
      { name: "A", weight: 0, dist: 0 },
      { name: "D", weight: 0, dist: 0 },
    ],
  },
  {
    name: "D",
    x: 120,
    y: 100,
    connections: [
      { name: "B", weight: 0, dist: 0 },
      { name: "C", weight: 0, dist: 0 },
      { name: "E", weight: 0, dist: 0 },
      { name: "F", weight: 0, dist: 0 },
    ],
  },
  {
    name: "E",
    x: 40,
    y: 160,
    connections: [
      { name: "B", weight: 0, dist: 0 },
      { name: "D", weight: 0, dist: 0 },
      { name: "F", weight: 0, dist: 0 },
      { name: "A", weight: 0, dist: 0 },
    ],
  },
  {
    name: "F",
    x: 100,
    y: 150,
    connections: [
      { name: "E", weight: 0, dist: 0 },
      { name: "D", weight: 0, dist: 0 },
      { name: "B", weight: 0, dist: 0 },
      { name: "G", weight: 0, dist: 0 },
    ],
  },
  {
    name: "G",
    x: 150,
    y: 200,
    connections: [{ name: "F", weight: 0, dist: 0 }],
  },
];

for (let k = 0; k < city.length; k++) {
  for (let j = 0; j < city[k].connections.length; j++) {
    city[k].connections[j].dist = EuclideanDistance(
      city[k].name,
      city[k].connections[j].name
    );
  }
}

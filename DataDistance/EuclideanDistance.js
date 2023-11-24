import { city } from '../DataCity/dataCity.js';

export function EuclideanDistance(x1, y1, x2, y2) {
	let distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2);
	return distance;
}

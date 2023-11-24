import fs from 'fs';
import { Parser } from 'binary-parser';
import zlib from 'zlib';

function openRData(filePath) {
	const headerParser = new Parser()
		.string('header', { length: 4 })
		.string('version', { length: 4 });

	const headerData = fs.readFileSync(filePath, {
		encoding: 'binary',
		flag: 'r',
	});

	console.log('log', headerData);
	const header = headerParser.parse(headerData);

	if (header.header === 'RDX1' && header.version === 'X\n') {
		const compressedData = fs.readFileSync(filePath, {
			encoding: 'binary',
			flag: 'r',
		});
		const uncompressedData = zlib.inflateSync(compressedData.slice(8));

		return uncompressedData.toString();
	} else {
		console.error('Este não é um arquivo .RData válido.');
		return null;
	}
}

export default openRData;

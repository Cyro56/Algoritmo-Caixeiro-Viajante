import { openFile } from '../utils/openFile.js';
import { parseDatFile } from '../utils/formatDatFile.js';

const filePath = '/Users/cyroMBlabs/Documents/dadosOperantar/dados_aux1.dat';

export const Operantar = async () => {
	const data = await openFile(filePath);

	const dataArray = await parseDatFile(data);
	return dataArray;
};

import { openFile } from './utils/openFile.js';
import { parseDatFile } from './utils/formatDatFile.js';

const filePath = '/Users/cyroMBlabs/Documents/dadosOperantar/dados_aux8.dat';
const data = await openFile(filePath);
const formatData = await parseDatFile(data);

if (formatData) {
	console.log('Array de objetos:', formatData);
} else {
	console.error('Erro ao processar o arquivo .dat.');
}

import fs from 'fs/promises';

export const openFile = async (filePath) => {
	try {
		// Lê o conteúdo do arquivo .dat
		const data = await fs.readFile(filePath, 'utf8');
		return data;
	} catch (error) {
		console.error('Erro ao ler o arquivo .dat:', error.message);
		return null;
	}
};

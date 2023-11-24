import fs from 'fs';

const getData = async (filePath) => {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

		const dataArray = lines.map((line) => {
			try {
				// Remover as chaves e substituir : por :
				const cleanedLine = line
					.replace(/[{}]/g, '')
					.replace(/(\w+):/g, '"$1":');
				// Parse cada linha como objeto JavaScript
				return new Function(`return {${cleanedLine}}`)();
			} catch (error) {
				console.error(`Erro ao analisar linha como objeto JavaScript: ${line}`);
				return null;
			}
		});

		return dataArray.filter((data) => data !== null);
	} catch (error) {
		console.error(`Erro ao ler o arquivo: ${error.message}`);
		return [];
	}
};

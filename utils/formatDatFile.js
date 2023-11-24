export const parseDatFile = async (data) => {
	try {
		const lines = data.split('\n');

		if (lines[lines.length - 1].trim() === '') {
			lines.pop();
		}

		const dataArray = lines.map((line) => {
			const [, day, longitude, latitude] = line
				.trim()
				.match(/"\d+"\s+\S+\s+(\S+)\s+(\S+)\s+(\S+)/);

			return {
				day: parseFloat(day),
				longitude: parseFloat(longitude),
				latitude: parseFloat(latitude),
			};
		});

		return dataArray;
	} catch (error) {
		console.error('Erro ao processar o arquivo .dat:', error.message);
		return null;
	}
};

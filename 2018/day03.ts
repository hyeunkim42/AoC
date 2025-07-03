export function day3_part1(input: string) {
	const data = input.split("\n");

	let area: Map<string, number> = new Map();
	let commonArea: number = 0;

	for (let line of data) {
		const startX = parseInt(line.slice(line.indexOf("@") + 1, line.indexOf(",")));
		const startY = parseInt(line.slice(line.indexOf(",") + 1, line.indexOf(":")));
		const width = parseInt(line.slice(line.indexOf(":") + 1, line.indexOf("x")));
		const height = parseInt(line.slice(line.indexOf("x") + 1));

		for (let dx = 0; dx < width; dx++) {
			for (let dy = 0; dy < height; dy++) {
				const currCoord: string = `${startX + dx},${startY + dy}`;
				let count: number = area.get(currCoord) || 0;

				if (count == 1) {
					commonArea++;
				}
				area.set(currCoord, count + 1);
			}
		}
	}
	return commonArea;
}
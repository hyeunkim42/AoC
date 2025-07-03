type fabricArea = {
	id: number,
	startX: number,
	startY: number,
	width: number,
	height: number
}

function parseSquare(input: string): fabricArea {
	let fabricArea: fabricArea = {
		id: parseInt(input.slice(input.indexOf("#") + 1, input.indexOf("@"))),
		startX: parseInt(input.slice(input.indexOf("@") + 1, input.indexOf(","))),
		startY: parseInt(input.slice(input.indexOf(",") + 1, input.indexOf(":"))),
		width: parseInt(input.slice(input.indexOf(":") + 1, input.indexOf("x"))),
		height: parseInt(input.slice(input.indexOf("x") + 1))
	}
	return fabricArea;
}

export function day3_part1(input: string) {
	const data = input.split("\n");

	let area: Map<string, number> = new Map();
	let commonArea: number = 0;

	for (let line of data) {
		const fabricArea = parseSquare(line);

		for (let dx = 0; dx < fabricArea.width; dx++) {
			for (let dy = 0; dy < fabricArea.height; dy++) {
				const currCoord: string = `${fabricArea.startX + dx},${fabricArea.startY + dy}`;
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

export function day3_part2(input: string): number {
	const data: string[] = input.split("\n");

	let area: Map<string, number> = new Map();
	let ids: Set<number> = new Set();
	let clash: Set<number> = new Set();
	for (const line of data) {
		const fabricArea = parseSquare(line);

		ids.add(fabricArea.id);
		for (let dx = 0; dx < fabricArea.width; dx++) {
			for (let dy = 0; dy < fabricArea.height; dy++) {
				const currCoord = `${fabricArea.startX + dx},${fabricArea.startY + dy}`;
				let count: number = area.get(currCoord) || 0;

				if (count === 0) {
					area.set(currCoord, fabricArea.id);
				} else if (count > 0) {
					clash.add(count);
					clash.add(fabricArea.id);
					area.set(currCoord, -1);
				} else {
					clash.add(fabricArea.id);
				}
			}
		}
	}
	let nonClash = ids.difference(clash);
	return nonClash.values().next().value || 0;
}
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
	for (const line of data) {
		const fabricArea = parseSquare(line);

		for (let dx = 0; dx < fabricArea.width; dx++) {
			for (let dy = 0; dy < fabricArea.height; dy++) {
				const currCoord = `${fabricArea.startX + dx},${fabricArea.startY + dy}`;
				let count: number = area.get(currCoord) || 0;

				area.set(currCoord, count + 1);
			}
		}
	}
	for (const line of data) {
		const fabricArea = parseSquare(line);

		let isSeparate = true;
		for (let dx = 0; dx < fabricArea.width; dx++) {
			for (let dy = 0; dy < fabricArea.height; dy++) {
				const currCoord = `${fabricArea.startX + dx},${fabricArea.startY + dy}`;
				const claim : number = area.get(currCoord) || 0;
				if (claim > 1)
					isSeparate = false;
			}
		}
		if (isSeparate)
			return fabricArea.id;
	}
	return 0;
}
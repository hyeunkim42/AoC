import invariant from "./invariant";

type FabricArea = {
	id: number,
	start: { x: number, y: number },
	size: { width: number, height: number };
}

type Point = `${number},${number}`;

// parse a single line into structured data
const parseLine = (line: string): FabricArea => {
	const match = line.match(/#(\d+) @(\d+),(\d+): (\d+)x(\d+)/);
	invariant(match !== null, line);

	const [, id, x, y, width, height] = match;
	invariant(id !== undefined, line);
	invariant(x !== undefined, line);
	invariant(y !== undefined, line);
	invariant(width !== undefined, line);
	invariant(height !== undefined, line);

	return {
		id: parseInt(id),
		start: { x: parseInt(x), y: parseInt(y) },
		size: { width: parseInt(width), height: parseInt(height) }
	}
}

const pointsOf = ({ start, size }: FabricArea): Point[] => {
	const rows = Array.from({ length: size.width }, (_, dx) => {
		const cols = Array.from({ length: size.height }, (_, dy) => {
			return `${start.x + dx},${start.y + dy}` as Point;
		});
		return cols;
	})
	return rows.flat();
}

const frequencies = (items: Point[]): Map<Point, number> => {
	const freq = new Map<Point, number>();
	for (const item of items) {
		freq.set(item, (freq.get(item) ?? 0) + 1);
	}
	return freq;
}

const answer1 = (input: string[]): number => {
	const allPoints = input.map(parseLine).flatMap(pointsOf);
	const frequency = frequencies(allPoints);
	return Array.from(frequency.values()).filter(count => count >= 2).length;
};

const answer2 = (input: string[]): number => {
	const squares = input.map(line => {
		const area = parseLine(line);
		return {id: area.id, points: pointsOf(area)}
	});

	const freq = frequencies(squares.flatMap(s => s.points));

	const nonOverlapping = squares.find(({ points }) =>
		points.every(point => freq.get(point) === 1)
	);
	return nonOverlapping?.id ?? 0;
}

export function day3_part1(input: string) {
	return answer1(input.trim().split("\n"));
}

export function day3_part2(input: string): number {
	return answer2(input.trim().split("\n"));
}
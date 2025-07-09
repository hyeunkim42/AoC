import invariant from "./invariant";

type FabricArea = {
	id: string;
	start: { x: number; y: number };
	size: { width: number; height: number };
};

type Point = `${number},${number}`;

// Parse a single line into structured data
const parseLine = (line: string): FabricArea => {
	const match = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
	invariant(match !== null, line);

	const [, id, x, y, width, height] = match;

	invariant(id !== undefined, line)
	invariant(x !== undefined, line)
	invariant(y !== undefined, line)
	invariant(width !== undefined, line)
	invariant(height !== undefined, line)

	return {
		id,
		start: { x: parseInt(x), y: parseInt(y) },
		size: { width: parseInt(width), height: parseInt(height) }
	};
};

// Generate all points within a rectangle as string keys
const pointsOf = ({ start, size }: FabricArea): Point[] =>
	Array.from({ length: size.width }, (_, dx) =>
		Array.from({ length: size.height }, (_, dy) =>
			`${start.x + dx},${start.y + dy}` as Point
		)
	).flat();

// Count frequency of each point
const frequencies = (items: Point[]): Map<Point, number> => {
	const freq = new Map<Point, number>();
	for (const item of items) {
		freq.set(item, (freq.get(item) ?? 0) + 1);
	}
	return freq;
};

// Part 1: Count overlapping area
const answer1 = (input: string[]): number => {
	const allPoints = input
		.map(parseLine)
		.flatMap(pointsOf);

	const freq = frequencies(allPoints);
	return Array.from(freq.values()).filter(count => count >= 2).length;
};

// Part 2: Find non-overlapping square
const answer2 = (input: string[]): string => {
	const squares = input
		.map(line => {
			const area = parseLine(line);
			return { id: area.id, points: pointsOf(area) }
		});

	const freq = frequencies(squares.flatMap(s => s.points));

	const nonOverlapping = squares.find(({ points }) =>
		points.every(point => freq.get(point) === 1)

	);

	return nonOverlapping?.id ?? '';
};

// Exported interface
export function day3_part1(input: string): number {
	return answer1(input.trim().split('\n'));
}

export function day3_part2(input: string): number {
	const result = answer2(input.trim().split('\n'));
	return parseInt(result, 10);
}

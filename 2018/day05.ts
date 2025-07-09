export function day5_part1(input: string) {
	const lowerUpper = Array.from({ length: 26 }, (_, i) => {
		const lower = String.fromCharCode(97 + i);
		const upper = String.fromCharCode(65 + i);
		return `${lower}${upper}`;
	})
	const upperLower = Array.from({ length: 26 }, (_, i) => {
		const upper = String.fromCharCode(65 + i);
		const lower = String.fromCharCode(97 + i);
		return `${upper}${lower}`
	})
	const pattern = [...lowerUpper, ...upperLower];
	const regexp = new RegExp(pattern.join("|"), "");

	let prevLength = input.length;
	do {
		prevLength = input.length;
		input = input.replace(regexp, "");
	} while (prevLength !== input.length)

	return input.length;
}
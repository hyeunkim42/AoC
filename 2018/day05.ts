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
} // 3.42s

export function day5_part1_m2(input:string) {
	let stack: string[] = [];
	for (let c of input) {
		const last = stack.at(stack.length - 1);
		if (last && last !== c && last.toLowerCase() === c.toLowerCase()) {
			stack.pop();
		} else {
			stack.push(c);
		}
	}
	return stack.length;
} //11.47ms

export function day5_part2(input: string) {
	return 0;
}
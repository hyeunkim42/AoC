export function day1(input: string) {
	const data = input.split('\n');
	const nums = data.map(line => parseInt(line, 10));

	return nums.reduce((acc, val) => acc + val, 0);
}

export function day1_part2(input: string) {
	const data = input.split('\n');
	const nums = data.map(line => parseInt(line, 10));

	const frequencies: Set<number> = new Set([0]);
	let freq: number = 0;
	let current = 0;
	const timeout = 1000000;
	while (current < timeout) {
		current++;

		for (let val of nums) {
			freq += val;
			if (frequencies.has(freq)) {
				return freq;
			}
			frequencies.add(freq);
		}
	}

	throw Error("no!")
}
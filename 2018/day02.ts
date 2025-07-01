export function day2_part1(input: string): number {
	const ids = input.split("\n");

	let two: number = 0;
	let three: number = 0;
	for (let id of ids) {
		let scrambled: Set<string> = new Set();
		let double: Set<string> = new Set();
		let triple: Set<string> = new Set();
		let manyTimes: Set<string> = new Set();
		for (let c of id) {
			if (!scrambled.has(c)) {
				scrambled.add(c);
			} else if (double.has(c)) {
				double.delete(c);
				triple.add(c);
			} else if (triple.has(c)) {
				triple.delete(c);
				manyTimes.add(c);
			} else {
				double.add(c);
			}
		}
		if (double.size) two++;
		if (triple.size) three++;
	}
	return two * three;
}

export function day2_part2(input: string): string {
	let ids = input.split("\n");

	for (const [i, id1] of ids.entries()) {
		for (const [j, id2] of ids.entries()) {
			if (i >= j) continue;
			if (id1.length != id2.length) continue;

			let diffCount = 0;
			let common = "";

			for (let idx = 0; idx < id1.length; idx++) {
				if (id1.at(idx) != id2.at(idx)) {
					diffCount++;
				} else {
					common += id1.at(idx);
				}
				if (diffCount > 1)
					break;
			}
			if (diffCount == 1)
				return common;
		}
	}
	return "not found";
}
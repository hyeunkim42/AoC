function reactPolymerMethod1(input: string) {
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

	return input;
}

function reactPolymerMethod2(input: string) {
	let stack: string[] = [];
	for (let char of input) {
		const last = stack.at(stack.length - 1);
		if (last && last !== char && last.toLowerCase() === char.toLowerCase()) {
			stack.pop();
		} else {
			stack.push(char);
		}
	}
	return stack.join('');
}

export function day5_part1(input: string) {
	// const result1 = reactPolymerMethod1(input); // 3.42s
	const result2 = reactPolymerMethod2(input); // 11.47ms
	// console.log(result2);
	return result2.length;
}

export function day5_part2(input: string) {
	let minLen = input.length;
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for (const c of alphabet) {
		const pattern = c + "|" + c.toLowerCase();
		const regexp = new RegExp(pattern, "g");
		const removedstring = input.replace(regexp, "");
		const fullyReactedString = reactPolymerMethod2(removedstring);

		if (minLen > fullyReactedString.length)
			minLen = fullyReactedString.length;
	}
	return minLen;
}
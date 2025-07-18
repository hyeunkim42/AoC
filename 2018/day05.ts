const isReactable = (a: string, b: string): boolean =>
	Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;

function reactPolymer(input: string): string {
	const stack: string[] = []; // method로 내부를 변경하는 건 새 할당이 아니라서 const로 선언해도 문제 없음
	for (const char of input) {
		const last = stack[stack.length -1];

		if (last && isReactable(last, char)) {
			stack.pop();
		} else {
			stack.push(char);
		}
	}
	return stack.join("");
}

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

function removeChar(input: string, char: string): string {
	const lower = char.toLowerCase();
	const upper = char.toUpperCase();
	const result: string[] = [];

	for (const c of input) {
		if (c !== lower && c !== upper) {
			result.push(c);
		}
	}
	return result.join("");
}

export function day5_part1(input: string) {
	// const result1 = reactPolymerMethod1(input); // 3.42s
	const result2 = reactPolymer(input); // 11.47ms
	return result2.length;
}

export function day5_part2(input: string) {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let minLen = input.length;

	for (const char of alphabet) {
		const removed = removeChar(input, char);
		const reacted = reactPolymer(removed);

		minLen = Math.min(minLen, reacted.length);
	}
	return minLen;
}
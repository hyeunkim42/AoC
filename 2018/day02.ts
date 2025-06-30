import { readFileSync } from 'node:fs';

function readFile(filepath: string, encoding = 'utf8'): string[] {
	try {
		return readFileSync(filepath, 'utf8').split('\r\n');
	} catch (error) {
		console.error(`Error on reading ${filepath}`, error);
		return [];
	}
}

function findChecksum(boxIDs: string[]): number {
	let twoTimes: number = 0;
	let threeTimes: number = 0;
	for (let ID of boxIDs) {
		let scrambled = new Set();
		let twice = new Set();
		let triple = new Set();
		let manyTimes = new Set();
		for (let char of ID) {
			if (!scrambled.has(char)) {
				scrambled.add(char);
			} else {
				if (twice.has(char)) {
					twice.delete(char);
					triple.add(char);
				} else if (triple.has(char)) {
					triple.delete(char);
					manyTimes.add(char);
				} else {
					twice.add(char);
				}
			}
		}
		if (twice.size)
			twoTimes++;
		if (triple.size)
			threeTimes++;
	}
	return twoTimes * threeTimes;
}

const fileContent =  readFile('inputs/day02.txt');

console.log(findChecksum(fileContent));
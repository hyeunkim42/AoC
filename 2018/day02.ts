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

function findCorrectID(boxIDs:string[]): string {
	for (let i = 0; i < boxIDs.length; i++) {
		for (let j = i + 1; j < boxIDs.length; j++) {
			let diffCount = 0;
			let commonLetter = '';
			for (let idx = 0; idx < boxIDs[i].length; idx++) {
				if (boxIDs[i][idx] != boxIDs[j][idx]) {
					diffCount++;
				} else {
					commonLetter += (boxIDs[i][idx]);
				}
				if (diffCount > 1) {
					break ;
				}
			}
			if (diffCount == 1) {
				return commonLetter;
			}
		}
	}
	return '';
}

const fileContent =  readFile('inputs/day02.txt');

console.log(findChecksum(fileContent));
console.log(findCorrectID(fileContent));
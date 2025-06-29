import * as fs from 'fs';

fs.readFile('inputs/day01.txt', 'utf-8', (err, input)=>{
	if (err) {
		console.log("Error reading file: ", err);
		return ;
	}
	let data:string[] = input.split('\r\n');
	let nums = data.map(line => parseInt(line, 10));
	let ans1: number = nums.reduce((acc, val) => acc + val, 0);
	console.log("ans1 is:", ans1);

	let frequencies: Set<number> = new Set([0]);
	console.log(frequencies);
	let freq: number = 0;
	while (true) {
		for (let val of nums) {
			freq += val;
			if (frequencies.has(freq)) {
				console.log("first frequency twice reached: ", freq);
				return ;
			}
			frequencies.add(freq);
		}
	}
})

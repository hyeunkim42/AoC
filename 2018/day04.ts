// Find the guard that has the most minutes asleep
// What minute does that guard spend asleep the most?
type GuardInfo = {
	accLen: number,
	sleepMap: Array<number>
};

function addNewGuard(guards: Map<number, GuardInfo>, id: number) {
	if (!guards.has(id)) {
		let guard: GuardInfo = {
			accLen : 0,
			sleepMap : new Array<number>(60).fill(0)
		}
		guards.set(id, guard);
	}
	return id;
}

function recordSleep(guards: Map<number, GuardInfo>, id: number, start: number, end: number) {
	if (!guards.has(id))
		return;
	let guard = guards.get(id);
	if (typeof guard === 'object') {
		for (let i = start; i < end; i++) {
			guard.sleepMap[i]++;
		}
	}
	guard.accLen += end;
	guard.accLen -= start;
}

export function day4_part1(input: string) {
	const data = input.split("\n").sort();

	let guards: Map<number, GuardInfo> = new Map();
	let guardID: number = 0;
	let start: number = 0;

	for (const line of data) {
		if (line.indexOf("#") > 0) {
			guardID = addNewGuard(guards, parseInt(line.slice(line.indexOf("#") + 1)));
		} else if (line.indexOf("fall") > 0){
			start = parseInt(line.slice(line.indexOf(":") + 1));
		} else {
			recordSleep(guards, guardID, start, parseInt(line.slice(line.indexOf(":") + 1)));
		}
	}
	// find id of most slept guard
	let mostSlept: number = 0;
	let sleeplength: number = 0;
	let mostCommon: number = 0;
	let repTime: number = 0;
	guards.forEach((value: GuardInfo, id:number) => {
		if (value.accLen > sleeplength) {
			mostSlept = id;
			sleeplength = value.accLen;
			for (let i = 0; i < 60; i++) {
				if (value.sleepMap.at(i) > repTime){
					repTime = value.sleepMap.at(i);
					mostCommon = i;
				}
			}
		}
	})
	return mostSlept * mostCommon ;
}
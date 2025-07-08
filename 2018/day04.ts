// Find the guard that has the most minutes asleep
// What minute does that guard spend asleep the most?
type GuardInfo = {
	accLen: number,
	sleepMap: Map<number, number>
};

function addNewGuard(guards: Map<number, GuardInfo>, id: number) {
	if (!guards.has(id)) {
		let guard: GuardInfo = {
			accLen : 0,
			sleepMap : new Map<number, number>()
		}
		guards.set(id, guard);
	}
	return id;
}

function recordSleep(guards: Map<number, GuardInfo>, id: number, start: number, end: number) {
	let guard = guards.get(id);
	if (typeof guard === "undefined") {
		throw new Error(`Guard ${id} not found`);
	} else {
		let sleepMap = guard.sleepMap;
		if (typeof sleepMap === "undefined") {
			throw new Error(`Guard ${id} does not have sleep map`);
		} else {
			for (let i = start; i < end; i++) {
				const count = guard.sleepMap.get(i) || 0;
				guard.sleepMap.set(i, count + 1);
			}
		}
		guard.accLen += end;
		guard.accLen -= start;
	}
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
				if (value.sleepMap.get(i) || 0 > repTime){
					repTime = value.sleepMap.get(i) || 0;
					mostCommon = i;
				}
			}
		}
	})
	return mostSlept * mostCommon ;
}

export function day4_part2(input: string) {
	return 0;
}
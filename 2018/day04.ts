import { sleep } from "bun";
import invariant from "./invariant";

type SleepPeriod = {
	id: number,
	start: number,
	end: number
}

type GuardSleepInfo = {
	id: number,
	minute: number,
	times: number
}

// parse data
const parseId = (line: string): number =>
	parseInt(line.match(/Guard #(\d+) begins shift/)?.[1]||'0');

const parseInput = (input: string[]): Record <number, SleepPeriod[]> => {
	let currentId = 0;
	let sleepStart = 0;
	const result: SleepPeriod[] = [];

	input
		.sort()
		.forEach(line => {
			const [, minuteStr, msg] = line.match(/\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] (.+)/) || [];
			invariant(minuteStr !== undefined, "올바르지 않은 입력입니다: " + line);
			invariant(msg !== undefined, "올바르지 않은 입력입니다: " + line);
			const minute = parseInt(minuteStr);

			if (msg === "falls asleep") {
				sleepStart = minute;
			} else if (msg === "wakes up") {
				result.push({ id: currentId, start: sleepStart, end: minute });
			} else {
				currentId = parseId(msg);
			}
		})

	return Object.groupBy(result, period => period.id) as Record<number, SleepPeriod[]>;
}

const duration = ({ start, end }: SleepPeriod): number => end - start;

const mostSleptGuard = (sleepRecordById: Record<number, SleepPeriod[]>): number => {
	const sleepLengths = Object.entries(sleepRecordById)
		.map(([id, sleepList])=>({
			id: parseInt(id),
			total: sleepList.map(duration).reduce((sum, dur) => sum + dur, 0)
		}));
	const maxLength = Math.max(...sleepLengths.map(guard => guard.total));
	const result = sleepLengths.find(guard => guard.total === maxLength);
	invariant(result !== undefined, "Can't identify guard who slept most");
	return result.id;
}

const mostFrequentlySleptGuard = (sleepById: Record<number, SleepPeriod[]>): GuardSleepInfo => {
	const guardData = Object.entries(sleepById)
		.map(([id, sleepList]) => frequentlySlept(parseInt(id), sleepList));

	const maxFrequentTime = Math.max(...guardData.map (guard => guard.times));
	return guardData.find(guard => guard.times === maxFrequentTime)!;
}

const frequentlySlept = (id: number, sleepList: SleepPeriod[]):GuardSleepInfo => {
	const allMinutes = sleepList.flatMap(({ start, end }) =>
		Array.from({ length: end - start }, (_, i) => start + i)
	);

	const frequencies = allMinutes.reduce((freq, minute) => {
		freq[minute] = (freq[minute] || 0) + 1;
		return freq;
	}, {} as Record<number, number>);

	const maxFrequency = Math.max(...Object.values(frequencies));
	const minute = parseInt(Object.entries(frequencies)
		.find(([__, freq]) => freq === maxFrequency)![0]);
	return {id, minute, times: maxFrequency};
}

export function day4_part1(input: string) {
	// sort and parse data
	const record = parseInput(input.split("\n"));
	// find id of slept most via getting summation
	const id = mostSleptGuard(record);
	// find most slept guards most frequent sleep minute
	const result = frequentlySlept(id, record[id] || []);
	return id * result.minute;
}

export function day4_part2(input: string) {
	// sort and parse data
	const record = parseInput(input.split("\n"));
	// find who most frequently sleep at certain minute
	const reuslt = mostFrequentlySleptGuard(record);
	return reuslt.id * reuslt.minute;
}
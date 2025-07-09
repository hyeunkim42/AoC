import invariant from "./invariant";

type SleepPeriod = {
  id: number;
  start: number;
  end: number;
};

type GuardSleepData = {
  id: number;
  minute: number;
  times: number;
};


// Parse guard ID from message
const parseId = (message: string): number => 
  parseInt(message.match(/Guard #(\d+) begins shift/)?.[1] || '0');

// Parse input lines into sleep periods grouped by guard ID
const parseInputLines = (inputLines: string[]): Record<number, SleepPeriod[]> => {
  let currentId = 0;
  let sleepStart = 0;
  const result: SleepPeriod[] = [];
  
  inputLines
    .sort()
    .forEach(line => {
      const [, minuteStr, message] = line.match(/\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] (.+)/) || [];
	  invariant(minuteStr !== undefined, "올바르지 않은 입력입니다:" + line);
	  invariant(message !== undefined, "올바르지 않은 입력입니다:" + line);
      const minute = parseInt(minuteStr);
      
      if (message === "falls asleep") {
        sleepStart = minute;
      } else if (message === "wakes up") {
        result.push({ id: currentId, start: sleepStart, end: minute });
      } else {
        currentId = parseId(message);
      }
    });
  
  return Object.groupBy(result, period => period.id) as Record<number, SleepPeriod[]>;
};

// Calculate sleep duration
const duration = ({ start, end }: SleepPeriod): number => end - start;

// Find guard with most total sleep time
const topId = (sleepById: Record<number, SleepPeriod[]>): number => {
  const guardTotals = Object.entries(sleepById)
    .map(([id, sleepList]) => ({
      id: parseInt(id),
      total: sleepList.map(duration).reduce((sum, dur) => sum + dur, 0)
    }));
  
  const maxTotal = Math.max(...guardTotals.map(g => g.total));
  const result = guardTotals.find(g => g.total === maxTotal);
  invariant(result !== undefined, "maxTotal을 찾을 수 없습니다")
  return result.id;
};

// Find most frequent sleep minute for a guard
const mostSleepMinute = (id: number, sleepList: SleepPeriod[]): GuardSleepData => {
  const allMinutes = sleepList.flatMap(({ start, end }) => 
    Array.from({ length: end - start }, (_, i) => start + i)
  );
  
  const frequencies = allMinutes.reduce((freq, minute) => {
    freq[minute] = (freq[minute] || 0) + 1;
    return freq;
  }, {} as Record<number, number>);
  
  const maxTimes = Math.max(...Object.values(frequencies));
  const minute = parseInt(Object.entries(frequencies)
    .find(([_, times]) => times === maxTimes)![0]);
  
  return { id, minute, times: maxTimes };
};

// Find guard with highest sleep frequency on any minute
const mostSleepGuard = (sleepById: Record<number, SleepPeriod[]>): GuardSleepData => {
  const guardData = Object.entries(sleepById)
    .map(([id, sleepList]) => mostSleepMinute(parseInt(id), sleepList));
  
  const maxTimes = Math.max(...guardData.map(g => g.times));
  return guardData.find(g => g.times === maxTimes)!;
};

// Main export functions
export function day4_part1(input: string): number {
  const sleepById = parseInputLines(input.split("\n"));

  const id = topId(sleepById);
  const top = sleepById[id];
  invariant(top !== undefined, "topId를 찾지 못했습니다.");
  const result = mostSleepMinute(id, top);
  return result.id * result.minute;
}

export function day4_part2(input: string): number {
  const sleepById = parseInputLines(input.split("\n"));

  const result = mostSleepGuard(sleepById);
  return result.id * result.minute;
}

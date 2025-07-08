import { expect, test } from "bun:test";
import * as fs from "node:fs/promises";
import { day4_part1 } from "./day04";

test("day4 part1 test", async() => {
	expect(day4_part1("[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up")).toBe(240);
})

test("day4 par1 real", async() => {
	const input = await fs.readFile("inputs/day04.txt", "utf-8");

	expect(day4_part1(input)).toBe(106710);
})

// test("day4 part2 test", async() => {
	// expect(day4_part2("[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up")).toBe(4455);
// })

// test("day4 par2 real", async() => {
	// const input = await fs.readFile("inputs/day03.txt", "utf-8");

	// expect(day4_part2(input)).toBe(707);
// })

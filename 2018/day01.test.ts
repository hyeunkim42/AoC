import { expect, test } from "bun:test";
import * as fs from 'node:fs/promises';
import { day1, day1_part2 } from "./day01";


test("day1 part1 test", async () => {
    expect(day1("+1\n-2\n+3\n+1")).toBe(3)
})

test("day1 part1 real", async () => {
	const input = await fs.readFile('./2018/inputs/day01.txt', 'utf-8');

    expect(day1(input)).toBe(522)
})


test("day1 part2 test", async () => {
    expect(day1_part2("+1\n-2\n+3\n+1")).toBe(2)
})

test("day1 part2 real", async () => {
	const input = await fs.readFile('./2018/inputs/day01.txt', 'utf-8');

    expect(day1_part2(input)).toBe(73364)
})
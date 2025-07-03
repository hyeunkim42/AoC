import { expect, test } from "bun:test";
import * as fs from "node:fs/promises";
import { day3_part1, day3_part2 } from "./day03";

test("day3 part1 test", async() => {
	expect(day3_part1("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2")).toBe(4);
})

test("day3 par1 real", async() => {
	const input = await fs.readFile("inputs/day03.txt", "utf-8");

	expect(day3_part1(input)).toBe(116491);
})

test("day3 part2 test", async() => {
	expect(day3_part2("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2")).toBe(3);
})

test("day3 par2 real", async() => {
	const input = await fs.readFile("inputs/day03.txt", "utf-8");

	expect(day3_part2(input)).toBe(707);
})

import { expect, test } from "bun:test";
import * as fs from 'node:fs/promises';
import { day2_part1, day2_part2 } from "./day02";

test("day2 part2 test", async () => {
	expect(day2_part1("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab")).toBe(12);
})

test("day2 part1 real", async () => {
	const input = await fs.readFile("./2018/inputs/day02.txt", "utf-8");

	expect(day2_part1(input)).toBe(7688);
})

test("day2 part2 test", async () => {
	expect(day2_part2("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz")).toBe("fgij");
})

test("day2 part2 real", async () => {
	const input = await fs.readFile("./2018/inputs/day02.txt", "utf-8");

	expect(day2_part2(input)).toBe("lsrivmotzbdxpkxnaqmuwcchj");
})
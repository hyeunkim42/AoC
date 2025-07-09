import { expect, test } from "bun:test";
import * as fs from "node:fs/promises";
import { day5_part1, day5_part2 } from "./day05";

test("day5 part1 test", async() => {
	expect(day5_part1("dabAcCaCBAcCcaDA")).toBe(10);
})

test("day5 part1 result test", async() => {
	expect(day5_part1("tRrgPgGvVpGyYTvVemMQnNqQxXtTqOMmxHhFfGgXhZzSKJjMmksKkDDdaAdrRzZlkKLWwiInmMneEPIipBbNjJFfVvNvdDVsuUSHoCpcCPcHhmiUuSsoiIxXQqODdkKUvhdDuUwWoWwOSsHOoFfVJbBvxXlLVVvjIigGpPUuaMmAlLAaBQqLlbxmMXEeuIhHIimMuUPpEeJjsRrStTuUdpPuUCQBdDbqUWwHhKkuhdDHOBLlbrdOoKFHhGgGgfkfFDwWNnyuUYpPREeoEAaecCDdDdcYyxXdDsyYOokfFKSmxXMFfdLlnNEeyYMmDEeOCcnNrReEaAoDrRlpPLGVKkOXxiOoItTYyVvUuUuQqUaOogGAuoCckKIiyYSrRsvetTEgsSGtTrRPoOqvVlLpaAPzxvmMVXYtTuHhUyZSsDdSmMrRnNXqCcduyYUSsIiDgMCcQIiqmGstkLlKTmMSQdDMmxszZQqUuyYPpWwVvMmDdXxfFSDdsQSsZzpGVvgFJjdDfqQFtRrTtiITsSlgGdDLyYtPLlpbBHFWbsSBwfhVvHhTCRrrRPpOoWwfFMfoOFFYybBfiJjEeImcKwWaAkbBjYg")).toBe(7);
})

test("day5 part1 real", async() => {
	const input = await fs.readFile("./2018/inputs/day05.txt", "utf-8");

	expect(day5_part1(input)).toBe(10878);
})

test("day5 part2 test", async() => {
	expect(day5_part2("dabAcCaCBAcCcaDA")).toBe(4);
})

test("day5 part2 real", async() => {
	const input = await fs.readFile("./2018/inputs/day05.txt", "utf-8");

	
	expect(day5_part2(input)).toBe(6874);
})
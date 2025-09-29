import { footballMatch } from "./footballMatch";

describe("footballMatch", () => {
	test("footballMatch", () => {
		expect(footballMatch(4,1,1)).toBe(3);
		expect(footballMatch(10,3,2)).toBe(5);
		expect(footballMatch(13,12,1)).toBe(1);
	});
});
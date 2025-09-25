import { findMinCopyTime } from "./xeroxes";

describe("Xerox Copy Time Calculation", () => {
  describe("Basic functionality", () => {
    test("should calculate time for equal speed machines", () => {
      expect(findMinCopyTime(1, 1, 4)).toBe(3);
      expect(findMinCopyTime(1, 2, 5)).toBe(4);
    });
  });
});

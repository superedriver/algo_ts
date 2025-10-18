import { closeToTarget } from "./closeToTarget";

describe("closeToTarget", () => {
  test("closeToTarget", () => {
    expect(closeToTarget([1, 3, 4, 7, 10], 15)).toEqual([4, 10]);
    expect(closeToTarget([1, 3, 4, 7, 10], -3)).toEqual([1, 3]);
    expect(closeToTarget([-2, -1, 4, 7, 10], -3)).toEqual([-2, -1]);
    expect(closeToTarget([0, 1, 4, 7, 10], -3)).toEqual([0, 1]);
  });
});
 
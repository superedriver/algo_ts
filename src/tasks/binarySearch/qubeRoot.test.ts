import {
  qubeRoot,
  qubeRootMaxPrecisionCycle,
  qubeRootMaxPrecision,
} from "./qubeRoot";

describe("qubeRoot", () => {
  test("qubeRoot", () => {
    expect(qubeRoot(27)).toBe(3.000244140625);
    expect(qubeRoot(64)).toBe(4.000152587890625);
    expect(qubeRoot(1000)).toBe(10.000656127929688);
  });

  test("qubeRootMaxPrecisionCycle", () => {
    expect(qubeRootMaxPrecisionCycle(27)).toBe(3);
    expect(qubeRootMaxPrecisionCycle(64)).toBe(4);
    expect(qubeRootMaxPrecisionCycle(1000)).toBe(10);
  });

  test("qubeRootMaxPrecision", () => {
    expect(qubeRootMaxPrecision(27)).toBe(3);
    expect(qubeRootMaxPrecision(64)).toBe(4);
    expect(qubeRootMaxPrecision(1000)).toBe(10);
  });
});

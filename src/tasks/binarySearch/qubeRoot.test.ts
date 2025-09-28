import { qubeRoot } from "./qubeRoot";

describe("qubeRoot", () => {
  test("qubeRoot", () => {
    expect(qubeRoot(27)).toBe(3.000244140625);
    expect(qubeRoot(64)).toBe(4.000152587890625);
    expect(qubeRoot(1000)).toBe(10.000656127929688);
  });
});
